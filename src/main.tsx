import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, redirect} from "react-router"
import {RouterProvider} from "react-router/dom"
import {isAuthenticated} from "./auth/auth.ts"
import {Login} from "./auth/Login.tsx"

function requireAuthLoader() {
    if (!isAuthenticated()) {
        throw redirect("/");
    }
    return null;
}

function publicOnlyLoader() {
    if (isAuthenticated()) {
        throw redirect("/home");
    }
    return null;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        loader: publicOnlyLoader
    },
    {
        path: '/home',
        element: <App />,
        loader: requireAuthLoader
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
