import { Minus, PlusIcon, Star } from 'lucide-react'
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

const ProductCard = ({ image, name, price, rating = 0, stock = 10, onSelect }: ProductCardProps) => {
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
                        className="w-full h-full object-contain p-4" 
                    />
                </div>
                {stock < 5 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        ¡Últimas unidades!
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-2 p-4 pt-0">
                <h2 
                    className="text-base font-semibold text-slate-800 line-clamp-2 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={onSelect}
                >
                    {name}
                </h2>

                
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                            key={index}
                            size={14}
                            className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}
                        />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">({stock} disponibles)</span>
                </div>
                
                <p className="text-lg font-bold text-red-500">
                    {formatPrice(price)}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                        <button 
                            className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleDecrement}
                            disabled={cantidad <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <input 
                            type="number" 
                            className="w-12 text-center border rounded-lg p-1 text-sm"
                            value={cantidad}
                            min={1}
                            max={stock}
                            onChange={(e) => {
                                const value = Math.min(Math.max(1, Number(e.target.value)), stock)
                                setCantidad(value)
                            }}
                        />
                        <button 
                            className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleIncrement}
                            disabled={cantidad >= stock}
                        >
                            <PlusIcon size={14} />
                        </button>
                    </div>
                    <button className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard 