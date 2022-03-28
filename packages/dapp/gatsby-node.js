
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
