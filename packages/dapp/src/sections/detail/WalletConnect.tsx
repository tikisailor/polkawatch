import * as React from 'react';

import { InputLabel, Select, Button, FormControl, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';

export default function WalletConnect ({handler}) {

    let unsubscribe = null;

    const [wallet, setWallet] = useState('');
    const [accounts, setAccounts] = useState(null);


    useEffect(() => {
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    const handleGetWeb3 = async () => {
        const allInjected = await web3Enable('Polkawatch');
        if (allInjected.length === 0) {
            // TODO add prompt for user to install polkadotjs extension
            console.log('no extension found. Install polkadotjs extension!')
            return;
        }

        unsubscribe = await web3AccountsSubscribe(( injectedAccounts ) => {
            setAccounts(injectedAccounts)
            injectedAccounts.map(( account ) => {
            })
        });
    };

    const handleChange = (event) => {
        setWallet(event.target.value);
        handler(event.target.value);
    };

    return (
        <>
            { accounts === null ? <Button onClick={handleGetWeb3}>Connect Wallet</Button> :
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Accounts
                </InputLabel>

                    <Select
                    value={wallet}
                    label="Accounts"
                    inputProps={{
                        name: 'accounts',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleChange}
                >
                        <MenuItem value={'All'}>{'All'}</MenuItem>
                        {accounts.map((account) => {
                            return (
                                <MenuItem value={account.address}>{account.meta.name}</MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            }
        </>
    );
}