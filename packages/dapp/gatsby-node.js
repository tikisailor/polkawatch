const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    createPage({
        path: `/geography/region/:regionId`,
        matchPath: `/geography/region/:regionId`,
        component: require.resolve('./src/pages/detail/region.tsx'),
    })

    createPage({
        path: `/geography/country/:countryId`,
        matchPath: `/geography/country/:countryId/`,
        component: require.resolve('./src/pages/detail/country.tsx'),
    })

    createPage({
        path: `/geography/country-network/:networkId/:countryId`,
        matchPath: `/geography/country-network/:networkId/:countryId`,
        component: require.resolve('./src/pages/detail/country-network.tsx'),
    })

    createPage({
        path: `/network/:networkId`,
        matchPath: `/network/:networkId`,
        component: require.resolve('./src/pages/detail/network.tsx'),
    })

    // createPage({
    //     path: `/validator/:validatorId`,
    //     matchPath: `/validator/:validatorId`,
    //     component: require.resolve('./src/pages/detail/validator.tsx'),
    // })

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