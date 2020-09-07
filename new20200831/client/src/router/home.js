const router = [
    {
        path: "/",
        name: "About",
        component: () => import("@/views/Home/Index")
    },
    {
        path: "/detailed",
        name: "detailed",
        component: () => import("@/views/Home/Detailed")
    },
    {
        path: "/404",
        name: "detailed",
        component: () => import("@/views/Home/404")
    }
]


export default router