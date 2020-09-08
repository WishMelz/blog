const router = [
    {
        path: "/",
        name: "About",
        component: () => import("@/views/Backstage/Index"),
        meta: {
            title: "后台管理系统"
        }
    },
    {
        path: "/be/new-blog",
        name: "newblog",
        component: () => import("@/views/Backstage/NewBlog"),
        meta: {
            title: "新建文章"
        }
    },
    {
        path: "/be/blog-list",
        name: "bloglist",
        component: () => import("@/views/Backstage/BlogList"),
        meta: {
            title: "历史文章"
        }
    },
    {
        path: "/be/edit-blog",
        name: "editblog",
        component: () => import("@/views/Backstage/EditBlog"),
        meta: {
            title: "修改文章"
        }
    },
    {
        path: "/be/routers",
        name: "routers",
        component: () => import("@/views/Backstage/Routers"),
        meta: {
            title: "首页导航"
        }
    },
    {
        path: "/be/setting",
        name: "setting",
        component: () => import("@/views/Backstage/Setting"),
        meta: {
            title: "站点设置"
        }
    }
]


export default router;