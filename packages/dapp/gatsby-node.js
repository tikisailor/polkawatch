const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    createPage({
        path: `/geography/region/:regionId/:regionName`,
        matchPath: `/geography/region/:regionId/:regionName`,
        component: require.resolve('./src/pages/detail/region.tsx'),
    })

    createPage({
        path: `/geography/country/:countryId/:countryName`,
        matchPath: `/geography/country/:countryId/:countryName`,
        component: require.resolve('./src/pages/detail/country.tsx'),
    })

    createPage({
        path: `/network/:networkId/:networkName`,
        matchPath: `/network/:networkId/:networkName`,
        component: require.resolve('./src/pages/detail/network.tsx'),
    })

    createPage({
        path: `/operator/:operatorId/:operatorName`,
        matchPath: `/operator/:operatorId/operatorName`,
        component: require.resolve('./src/pages/detail/operator.tsx'),
    })

    const { createRedirect } = actions;
    createRedirect({
        fromPath: "/",
        toPath: "/dashboard/home",
        redirectInBrowser: true,
        isPermanent: true
    });
    createRedirect({
        fromPath: "/dashboard",
        toPath: "/dashboard/home",
        redirectInBrowser: true,
        isPermanent: true
    });
};

exports.onCreateWebpackConfig = function({ actions }) {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@ddp/client': path.resolve(__dirname, '../ddp-client')
            }
        }
    })
}