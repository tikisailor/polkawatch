import * as React from 'react';

// material
import { createTheme } from '@mui/material/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';


// Minimals.cc Gatsby note:
// This module returns only the theme, other arrangements are typically placed or have been migrated to
// the TopLayout Plugin, that includes the CSS Baseline and the Styled Engine Provider

const theme=createTheme({
    palette,
    shape,
    typography,
    shadows,
    customShadows,
});

theme.components=componentsOverride(theme);

export default theme;