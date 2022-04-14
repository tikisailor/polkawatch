import * as React from 'react';

import { Icon } from '@iconify/react';
import {useEffect, useRef, useState} from 'react';
import {navigate} from "gatsby";
// material
import { alpha } from '@mui/material/styles';
import {Button, Box, Divider, MenuItem, Typography, Avatar, IconButton, useTheme, Tooltip} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

import Identicon from '@polkadot/react-identicon';
import walletOutlined from '@iconify/icons-ant-design/wallet-outlined';

const InstallExtensionHomepage = "https://polkadot.js.org/extension/"

// ----------------------------------------------------------------------

export default function PolkadotWallet({permission=false, selectedAccount,accounts=[],extensions=[],onPermissionRequest=(permission)=>{},onAccountSelected=(account)=>{}   }) {
    const anchorRef = useRef(null);

    const selectedAccountAddress = selectedAccount ? selectedAccount.address : undefined;

    // We just granted permission, there are accounts, but not one selected
    // We auto-open in that case:
    const [open, setOpen] = useState(false /*permission && !selectedAccountAddress*/);

    useEffect(()=>{
        setTimeout(()=>{
            if(permission && !selectedAccountAddress) setOpen(true);
        },250)
    },[permission,selectedAccountAddress])

    const handleOpen = () => {
        // If we asked for wallet permission we can open the menu
        // otherwise, we need to ask for it first
        if(permission) setOpen(true);
        else onPermissionRequest(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = (acc) =>{
        handleClose();
        onAccountSelected(acc);
    }

    return (
        <>
            <Tooltip title={selectedAccount?selectedAccount.meta.name:"Polkadot Wallet"}>
                <IconButton
                    ref={anchorRef}
                    onClick={handleOpen}
                    sx={{
                        padding: 0,
                        width: 44,
                        height: 44,
                        ...(open && {
                            '&:before': {
                                zIndex: 1,
                                content: "''",
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                position: 'absolute',
                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                            }
                        })
                    }}
                >
                    {
                        selectedAccount ?
                                <Identicon
                                    value={selectedAccount.address}
                                    size={32}
                                    theme={"polkadot"}
                                />
                            :
                            <Box
                                component={Icon}
                                icon={walletOutlined}
                                sx={{
                                    width: 32,
                                    height: 32
                                }}
                            />
                    }
                </IconButton>
            </Tooltip>

            { anchorRef &&
                (
                    <MenuPopover
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorRef.current}
                        sx={{ width: 220 }}
                    >
                        <Box sx={{ my: 1.5, px: 2.5 }}>
                            <Typography variant="subtitle1" noWrap>
                                {accounts.length ? "Accounts":"No Accounts"}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        {accounts.map((account) => (
                            <MenuItem
                                key={account.address}
                                onClick={()=>{handleSelect(account)}}
                                sx={{ typography: 'body2', py: 1, px: 2.5 }}
                            >
                                <Box
                                    sx={{
                                        mr: 2,
                                        width: 24,
                                        height: 24
                                    }}
                                >
                                    <Identicon
                                        value={account.address}
                                        size={24}
                                        theme={"polkadot"}
                                    />
                                </Box>
                                {
                                    account.address !== selectedAccountAddress ? account.meta.name :
                                        (
                                            <b>{account.meta.name}</b>
                                        )

                                }
                            </MenuItem>
                        ))}

                        { !extensions.length &&
                            <Box sx={{p: 2, pt: 1.5}}>
                                <Button
                                    fullWidth
                                    color="inherit"
                                    variant="outlined"
                                    onClick={()=>{navigate(InstallExtensionHomepage,{replace:false})}}
                                >
                                    Install Extension
                                </Button>
                            </Box>
                        }
                    </MenuPopover>
                )
            }
        </>
    );
}
