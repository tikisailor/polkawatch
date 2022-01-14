# Minimals Port to Gatsby

## Stack

This Minimal Gatsby dashboard/demo is based:

- MUI Gatsby [example project](https://github.com/mui-org/material-ui/tree/master/examples/gatsby) 
- Minimal [Free version](https://github.com/minimal-ui-kit/material-kit-react)

## Changes

Minimal is a React Application has been ported to Gatsby following the guidelines provided in 
the [documentation](https://www.gatsbyjs.com/docs/porting-from-create-react-app-to-gatsby/)

- Refactored Theme, split between theme and Top Layout Plugin
- All components must include React
- Removed react-router-dom dependencies
- Restructured dashboard pages to explicitly use DashboardLayout
- Moved /static path to /
- Implemented dashboard to dashboard/app redirection via plugin [gatsby-plugin-meta-redirect](https://www.gatsbyjs.com/plugins/gatsby-plugin-meta-redirect/)
- Implemented alternative match path

## Development and Testing

```
yarn install
gatsby develop
```