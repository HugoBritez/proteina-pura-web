import { Minus, PlusIcon, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useClientConfig } from '../../../config/ClientConfigContext'

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
    const { config } = useClientConfig()

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
                    <div 
                        className="absolute top-1 right-1 text-white text-xs px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: config.tema.colores.primario }}
                    >
                        ¡Últimas unidades!
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-1 p-2">
                <h2 
                    className="text-sm font-semibold text-slate-800 line-clamp-2 cursor-pointer transition-colors"
                    style={{ '--tw-text-opacity': 1, color: config.tema.colores.subtexto } as React.CSSProperties}
                    onClick={onSelect}
                >
                    {name}
                </h2>

                <div className="flex items-center gap-1">
                    <p 
                        className="text-sm font-bold"
                        style={{ color: config.tema.colores.primario }}
                    >
                        {formatPrice(price)}
                    </p>
                    <span className="text-xs text-slate-500">({stock})</span>
                </div>
                
                <div className="flex flex-row items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                        <button 
                            className="text-white p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: config.tema.colores.primario }}
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
                            className="text-white p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: config.tema.colores.primario }}
                            onClick={handleIncrement}
                            disabled={cantidad >= stock}
                        >
                            <PlusIcon size={12} />
                        </button>
                    </div>
                    <button 
                        className="p-1.5 rounded-lg transition-colors text-sm font-medium"
                        style={{ 
                            borderColor: config.tema.colores.primario,
                            color: config.tema.colores.primario
                        }}
                    >
                        <ShoppingCart size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard 