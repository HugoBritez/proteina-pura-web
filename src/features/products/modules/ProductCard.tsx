import { Minus, Plus as PlusIcon, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useClientConfig } from '../../../config/ClientConfigContext'
import { Producto } from '../types/product.type'
import { formatCurrency } from '../utils/formatCurrency'
import { useCartStore } from '../../cart/cartStore'
import Toast from '../../../shared/ui/Toast/Toast'

interface ProductCardProps {
    producto: Producto
    onSelect: () => void
}

const ProductCard = ({ producto, onSelect }: ProductCardProps) => {
    const { config } = useClientConfig()
    const [cantidad, setCantidad] = useState(1)
    const [showToast, setShowToast] = useState(false)
    const addItem = useCartStore(state => state.addItem)

    const handleIncrement = () => {
        if (cantidad < 10) {
            setCantidad(cantidad + 1)
        }
    }

    const handleDecrement = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evitar que se active el onClick del card
        addItem({
            id: producto.id.toString(),
            name: producto.nombre,
            price: producto.precio,
            quantity: cantidad,
            image: producto.imagen || '/placeholder.png'
        });
        setShowToast(true);
    }

    return (
        <>
            <div 
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 h-full"
                onClick={onSelect}
            >
                <div className="relative w-full cursor-pointer">
                    <div className="aspect-square">
                        <img
                            src={producto.imagen || '/placeholder.png'}
                            alt={producto.nombre}
                            className="w-full h-full object-contain p-2"
                        />
                    </div>
                    {producto.stock !== null && (
                        <div 
                            className="absolute top-1 right-1 text-white text-xs px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: config.tema.colores.primario }}
                        >
                            {producto.stock ? 'En stock' : 'Sin stock'}
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col gap-1 p-2">
                    <h2 
                        className="text-sm font-semibold text-slate-800 line-clamp-2 cursor-pointer transition-colors"
                        style={{ '--tw-text-opacity': 1, color: config.tema.colores.subtexto } as React.CSSProperties}
                    >
                        {producto.nombre}
                    </h2>

                    <div className="flex items-center gap-1">
                        <p 
                            className="text-sm font-bold"
                            style={{ color: config.tema.colores.primario }}
                        >
                            {formatCurrency(producto.precio)}
                        </p>
                    </div>
                    
                    <div className="flex flex-row items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                            <button 
                                className="text-white p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: config.tema.colores.primario }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecrement();
                                }}
                                disabled={cantidad <= 1}
                            >
                                <Minus size={12} />
                            </button>
                            <input 
                                type="number" 
                                className="w-10 text-center border rounded-lg p-0.5 text-xs"
                                value={cantidad}
                                min={1}
                                max={10}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const value = Math.min(Math.max(1, Number(e.target.value)), 10);
                                    setCantidad(value);
                                }}
                            />
                            <button 
                                className="text-white p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: config.tema.colores.primario }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncrement();
                                }}
                                disabled={cantidad >= 10}
                            >
                                <PlusIcon size={12} />
                            </button>
                        </div>
                        <button 
                            className="p-1.5 rounded-lg transition-colors text-sm font-medium hover:bg-slate-50"
                            style={{ 
                                borderColor: config.tema.colores.primario,
                                color: config.tema.colores.primario
                            }}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={12} />
                        </button>
                    </div>
                </div>
            </div>

            <Toast 
                message={`${producto.nombre} agregado al carrito`}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}

export default ProductCard 