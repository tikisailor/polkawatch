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
        matchPath: `/geography/country/:countryId`,
        component: require.resolve('./src/pages/detail/country.tsx'),
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