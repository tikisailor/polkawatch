import * as React from 'react';

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, IconButton} from '@mui/material';
// components
import { MHidden } from '../../components/@material-extend';
//
// import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';
//import WalletConnect from "../../sections/detail/WalletConnect";

import PolkadotWallet from "./PolkadotWallet"
import {usePolkadotExtensionContext} from "../../contexts/PolkadotExtensionContext";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {

  const wallet = usePolkadotExtensionContext();
  console.log(`NAV: wallet is ${JSON.stringify(wallet)}`)

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        {/*<Searchbar />*/}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/*<LanguagePopover />*/}
          {/*<NotificationsPopover />*/}
          <PolkadotWallet
            permission={wallet.permission}
            selectedAccount={wallet.selectedAccount}
            extensions={wallet.extensions}
            accounts={wallet.accounts}
            onAccountSelected={wallet.setSelectedAccount}
            onPermissionRequest={wallet.setPermission}
          />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
