const path = require('path');

exports.onCreateWebpackConfig = function({ stage, loaders, actions }) {
    if (stage === "build-html" || stage === "develop-html") {
        actions.setWebpackConfig({
            resolve: {
                alias: {
                    '@ddp/client': path.resolve(__dirname, '../ddp-client')
                }
            },
            module: {
                rules: [
                    {
                        test: /\@polkadot\/extension-dapp/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
    else {
        actions.setWebpackConfig({
            resolve: {
                alias: {
                    '@ddp/client': path.resolve(__dirname, '../ddp-client')
                }
            },
        })
    }
}

exports.createPages = function({actions}){
    const { createPage } = actions;

    createPage({
        path: `/geography/region/:regionId/:regionLabel`,
        matchPath: `/geography/region/:regionId/:regionLabel`,
        component: require.resolve('./src/pages/detail/region.tsx'),
    });
    createPage({
        path: `/geography/country/:countryId/:countryLabel`,
        matchPath: `/geography/country/:countryId/:countryLabel`,
        component: require.resolve('./src/pages/detail/country.tsx'),
    });
    createPage({
        path: `/network/provider/:networkId/:networkLabel`,
        matchPath: `/network/provider/:networkId/:networkLabel`,
        component: require.resolve('./src/pages/detail/network.tsx'),
    });
    createPage({
        path: `/validation/operator/:operatorId/:operatorLabel`,
        matchPath: `/validation/operator/:operatorId/:operatorLabel`,
        component: require.resolve('./src/pages/detail/operator.tsx'),
    });
}