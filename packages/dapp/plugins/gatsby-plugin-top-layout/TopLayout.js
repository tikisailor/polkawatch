import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider,StyledEngineProvider } from '@mui/material/styles';
import theme from '../../src/theme';
import {PolkadotExtensionProvider} from "../../src/contexts/PolkadotExtensionContext";

// scroll bar
import 'simplebar/src/simplebar.css';

export default function TopLayout(props) {
  return (
    <React.Fragment>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <PolkadotExtensionProvider>
                {props.children}
            </PolkadotExtensionProvider>
          </ThemeProvider>
        </StyledEngineProvider>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
