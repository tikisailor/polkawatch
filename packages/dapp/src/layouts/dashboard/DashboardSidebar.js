import * as React from 'react';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from '@reach/router';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer } from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
import {MHidden} from "../../components/@material-extend";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
      <Scrollbar
          sx={{
            height: '100%',
            '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
          }}
      >
        <Box sx={{px: 2.5, py: 3}}/>

        <NavSection navConfig={sidebarConfig} />

        <Box sx={{ flexGrow: 1 }} />

      </Scrollbar>
  );

  return (
      <RootStyle>
        <MHidden width="lgUp">
          <Drawer
              open={isOpenSidebar}
              onClose={onCloseSidebar}
              PaperProps={{
                sx: { width: DRAWER_WIDTH }
              }}
          >
            {renderContent}
          </Drawer>
        </MHidden>

        <MHidden width="lgDown">
          <Drawer
              open
              variant="persistent"
              PaperProps={{
                sx: {
                  width: DRAWER_WIDTH,
                  bgcolor: 'background.default'
                }
              }}
          >
            {renderContent}
          </Drawer>
        </MHidden>
      </RootStyle>
  );
}
