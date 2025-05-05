import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { BottomBar } from './shared/ui/BottomBar/BottomBar'
import Productos from './features/products/Productos'
import { ClientConfigProvider } from './config/ClientConfigContext'
import { Dashboard } from './features/admin/Dashboard'
import { Auth } from './features/auth/Auth'
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      {children}
      <BottomBar />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><div>Home</div></Layout>,
  },
  {
    path: "/shop",
    element: <Layout><Productos /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><div>Cart</div></Layout>,
  },
  {
    path: "/contact",
    element: <Layout><div>Contact</div></Layout>,
  },
  {
    path: "/admin",
    element: <Layout><Dashboard /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Auth /></Layout>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientConfigProvider>
      <RouterProvider router={router} />
    </ClientConfigProvider>
  </StrictMode>,
)
