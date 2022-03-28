import * as React from 'react';

import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
