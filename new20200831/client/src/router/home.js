const router = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/Home/Index")
    },
    {
        path: "/detailed",
        name: "detailed",
        component: () => import("@/views/Home/Detailed")
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/Home/404"),
        meta: {
            title: "404"
        }
    }
]


export default router