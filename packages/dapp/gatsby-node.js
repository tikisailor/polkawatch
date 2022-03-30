const path = require('path');


exports.createPages = ({ graphql, actions }) => {
    const { createRedirect } = actions;
    createRedirect({
        fromPath: "/",
        toPath: "/dashboard/app",
        redirectInBrowser: true,
        isPermanent: true
    });
    createRedirect({
        fromPath: "/dashboard",
        toPath: "/dashboard/app",
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