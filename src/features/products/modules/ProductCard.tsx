import { Minus, PlusIcon,  ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
    image: string
    name: string
    price: number
    description?: string
    rating?: number
    stock?: number
    onSelect?: () => void
}

const ProductCard = ({ image, name, price, stock = 10, onSelect }: ProductCardProps) => {
    const [cantidad, setCantidad] = useState(1)

    const handleIncrement = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    const handleDecrement = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG'
        }).format(price)
    }

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 h-full">
            <div 
                className="relative w-full cursor-pointer"
                onClick={onSelect}
            >
                <div className="aspect-square">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-contain p-2" 
                    />
                </div>
                {stock < 5 && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        ¡Últimas unidades!
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-1 p-2">
                <h2 
                    className="text-sm font-semibold text-slate-800 line-clamp-2 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={onSelect}
                >
                    {name}
                </h2>

                <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-red-500">
                        {formatPrice(price)}
                    </p>
                    <span className="text-xs text-slate-500">({stock})</span>
                </div>
                
                <div className="flex flex-row items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                        <button 
                            className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleDecrement}
                            disabled={cantidad <= 1}
                        >
                            <Minus size={12} />
                        </button>
                        <input 
                            type="number" 
                            className="w-10 text-center border rounded-lg p-0.5 text-xs"
                            value={cantidad}
                            min={1}
                            max={stock}
                            onChange={(e) => {
                                const value = Math.min(Math.max(1, Number(e.target.value)), stock)
                                setCantidad(value)
                            }}
                        />
                        <button 
                            className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleIncrement}
                            disabled={cantidad >= stock}
                        >
                            <PlusIcon size={12} />
                        </button>
                    </div>
                    <button className="border border-red-500 text-red-500 p-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                        <ShoppingCart size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard 