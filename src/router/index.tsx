


import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/404/NotFoundPage";

export const router = createBrowserRouter([

     {
        path: '/',
        Component: lazy(() => import("@/layouts/AuthLayout")),
        children: [
            {
                index:true,
                Component: lazy(() => import("@/pages/auth/LoginPage")),
            },
          
        ]
    },
    {
        path: '/auth',
        Component: lazy(() => import("@/layouts/AuthLayout")),
        children: [
            {
                path: 'login',
                // index:true,
                Component: lazy(() => import("@/pages/auth/LoginPage")),
            },
            {
                path: 'register',
                Component: lazy(() => import("@/pages/auth/RegisterPage")),
            },
            {
                path: 'verify-email',
                Component: lazy(() => import("@/pages/auth/VerifyEmail")),
            },
        ]
    },




    {
        path: '/admin',
        Component: lazy(() => import("@/layouts/AdminLayout")),
        children: [
            {
                index: true,
                Component: lazy(() => import("@/pages/admin/DashboardPage")),
            },
            {
                path: 'agents',
                Component: lazy(() => import("@/pages/admin/AgentsPage")),
            },
            {
                path: 'chats',
                Component: lazy(() => import("@/pages/admin/ChatPage")),
            },
            {
                path: 'leads',
                Component: lazy(() => import("@/pages/admin/LeadPage")),
            },
            {
                path: 'knowledgebases',
                Component: lazy(() => import("@/pages/admin/knowledgeBasePage")),
            },
            {
                path: 'sessions',
                Component: lazy(() => import("@/pages/admin/sessionPage")),
            },
             {
                path: 'test-agents',
                Component: lazy(() => import("@/pages/admin/TestAgentPage")),
            },





            // AgentsPage

        ]
    },

    {
        path: 'embedded',
        Component: lazy(() => import("@/pages/admin/EmbeddedPage")),
    },


]);