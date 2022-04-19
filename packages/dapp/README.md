# Polkawatch DAPP

This application presents the Polkawatch data to the user. 

## Accessing Polkawatch Data

The access to Polkawatch Data is managed by the DDP client api. The client API can be connected to a local DDP server
during full-stack development or to a DDP package published on IPFS by DDP during UI development. 

Using IPFS data allows UI development without having to host the Polkawatch cluster.

## Technology Stack

This DAPP is built on the following technology stack:

- [Polkadot API](https://polkadot.js.org/docs/api/) and Browser Extension
- [Apex Charts](https://apexcharts.com/)  Modern & Interactive Open-source Charts
- [Storybook](https://storybook.js.org/) Tool for building UI components in isolation.
- Gatsby MUI Minimal Design Template, see [example project](https://gitlab.com/polkawatch/gatsby-mui-minimal) including 
port to Gatsby by Polkawatch team.
- [Material UI](https://mui.com/) tool suite and component library.
- [Gatsby](https://www.gatsbyjs.com/) React Framework. 
- [React](https://reactjs.org/) A JavaScript library for building user interfaces.

## Developing the DAPP

Use the following commands to develop this DAPP:

- ```yarn start:dev``` to develop the DAPP with hot code updates. Will use IPFS Data Pack. Use for UI development only.
- ```yarn start:dev:dapp``` to develop the DAPP using your local DDP. Use for new Data + UI development.
- ```yarn start:dev:ui``` storybook playground to develop UI components in isolation, with hot code updates.
- ```yarn start:prod``` to build the production version of the application. 

## DAPP Testing

DAPP includes StoryShots Regressions tests based on Storybook, run as:

- ```yarn test```