const router = [
    {
        path: "/",
        name: "About",
        component: () => import("@/views/Backstage/Index")
    },
    {
        path: "/be/new-blog",
        name: "newblog",
        component: () => import("@/views/Backstage/NewBlog")
    },
    {
        path: "/be/blog-list",
        name: "bloglist",
        component: () => import("@/views/Backstage/BlogList")
    },
    {
        path: "/be/edit-blog",
        name: "editblog",
        component: () => import("@/views/Backstage/EditBlog")
    },
    {
        path: "/be/routers",
        name: "routers",
        component: () => import("@/views/Backstage/Routers")
    }
]


export default router;