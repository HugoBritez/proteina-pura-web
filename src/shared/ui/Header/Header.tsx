import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../features/cart/cartStore';
import { useClientConfig } from '../../../config/ClientConfigContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from '../../../features/cart/Cart';

export const Header = () => {
    const navigate = useNavigate();
    const { config } = useClientConfig();
    const items = useCartStore(state => state.items);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header 
            className=" flex fixed top-0 left-0 right-0 z-50 h-16 px-4 items-center justify-between"
            style={{ backgroundColor: config.tema.colores.primario }}
        >
            <div className="flex items-center">
                <p className='text-white text-xl cursor-pointer' onClick={() => navigate('/')}
                style={{fontFamily: config.tema.fuentes.principal}}
                    >
                {config.empresa.nombre.toUpperCase()}</p>
            </div>


            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/shop')}
                    className={`relative p-2 rounded-md transition-colors ${
                        window.location.pathname === '/shop' 
                            ? 'bg-white text-red-500 hover:bg-red-500 hover:text-white' 
                            : 'text-white hover:bg-white hover:text-red-500'
                    }`}
                >
                    <ShoppingBag size={24} />
                </button>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-white hover:text-red-500 ease-in-out duration-300 hover:bg-white rounded-md transition-colors"
                >
                    <ShoppingCart size={24} />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-50"
                    >
                        <div className="h-16 flex items-center justify-between px-4 border-b">
                            <h2 className="text-xl font-bold">Carrito</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                            <Cart />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};