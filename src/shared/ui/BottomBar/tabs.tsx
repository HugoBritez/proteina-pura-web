import { Home, ShoppingBag, ShoppingCart, MessageCircle } from 'lucide-react'
import { useLocation } from 'react-router'

export interface Tab {
    label: string;
    icon: React.ReactNode;
    path: string;
    isActive?: boolean;
}

export const useTabs = () => {
    const location = useLocation()
    
    const tabs: Tab[] = [
        {
            label: 'Inicio',
            icon: <Home size={24} />,
            path: '/',
        },
        {
            label: 'Tienda',
            icon: <ShoppingBag size={24} />,
            path: '/shop',
        },
        {
            label: 'Carrito',
            icon: <ShoppingCart size={24} />,
            path: '/cart',
        },
        {
            label: 'Contacto',
            icon: <MessageCircle size={24} />,
            path: '/contact',
        },
    ]

    return tabs.map(tab => ({
        ...tab,
        isActive: location.pathname === tab.path
    }))
} 