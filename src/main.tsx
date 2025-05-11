import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import { BottomBar } from './shared/ui/BottomBar/BottomBar'
import { Header } from './shared/ui/Header/Header'
import Productos from './features/products/Productos'
import { ClientConfigProvider } from './config/ClientConfigContext'
import { Dashboard } from './features/admin/Dashboard'
import { Auth } from './features/auth/Auth'
import Cart from './features/cart/Cart'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showBottomBar = location.pathname !== '/login';

  return (
    <div className="min-h-screen">
      <Header />
      <main className="md:pt-16">
        {children}
      </main>
      {showBottomBar && <BottomBar />}
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
    element: <Layout><Cart /></Layout>,
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
