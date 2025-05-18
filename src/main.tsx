import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Header } from './shared/ui/Header/Header'
import Productos from './features/products/Productos'
import { ClientConfigProvider } from './config/ClientConfigContext'
import { Dashboard } from './features/admin/Dashboard'
import { Auth } from './features/auth/Auth'
import Cart from './features/cart/Cart'
import { HomePage } from './features/home/HomePage'

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="min-h-screen">
      <Header />
      <main className="md:pt-16">
        {children}
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePage/></Layout>,
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
