import { Minus, PlusIcon, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClientConfig } from '../../../config/ClientConfigContext'
import { Producto } from '../types/product.type'

interface ProductDetailProps {
    product: Producto
    onClose: () => void
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
    const [cantidad, setCantidad] = useState(1)
    const [isOpen, setIsOpen] = useState(true)
    const { config } = useClientConfig()

    const handleClose = () => {
        setIsOpen(false)
        setTimeout(onClose, 200)
    }

    const handleIncrement = () => {
        if (product.stock === true) {
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
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-[100]"
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                    >
                        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-slate-800">Detalle del Producto</h2>
                            <button 
                                onClick={handleClose}
                                className="text-slate-500 hover:text-slate-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="aspect-square relative">
                                <img 
                                    src={product.imagen || '/placeholder.png'}
                                    alt={product.nombre}
                                    className="w-full h-full object-contain" 
                                />
                                    {(product.stock) === true && (
                                    <div 
                                        className="absolute top-2 right-2 text-white px-3 py-1 rounded-full text-sm"
                                        style={{ backgroundColor: config.tema.colores.primario }}
                                    >
                                        ¡Últimas unidades!
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-bold text-slate-800">
                                    {product.nombre}
                                </h1>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500">
                                        {product.stock ? "Disponible" : "No disponible"}
                                    </span>
                                </div>

                                <p className="text-slate-600">
                                    {product.descripcion}
                                </p>

                                <div className="flex flex-col gap-4 mt-4">
                                    <p 
                                        className="text-3xl font-bold"
                                        style={{ color: config.tema.colores.primario }}
                                    >
                                        {formatPrice(product.precio)}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                className="text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                style={{ backgroundColor: config.tema.colores.primario }}
                                                onClick={handleDecrement}
                                                disabled={cantidad <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <input 
                                                type="number" 
                                                className="w-16 text-center border rounded-lg p-2 text-lg"
                                                value={cantidad}
                                                min={1}
                                                onChange={(e) => {
                                                    const value = Math.min(Math.max(1, Number(e.target.value)), product.stock === true ? 10 : 0)
                                                    setCantidad(value)
                                                }}
                                            />
                                            <button 
                                                className="text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                style={{ backgroundColor: config.tema.colores.primario }}
                                                onClick={handleIncrement}
                                                disabled={product.stock === false}
                                            >
                                                <PlusIcon size={16} />
                                            </button>
                                        </div>
                                        <button 
                                            className="flex-1 text-white px-6 py-3 rounded-lg transition-colors text-lg font-medium"
                                            style={{ backgroundColor: config.tema.colores.primario }}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>

                                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                                        <h3 className="font-semibold text-slate-800 mb-2">Información adicional</h3>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            <li>• Envío gratis en compras mayores a Gs. 500.000</li>
                                            <li>• Garantía de devolución de 30 días</li>
                                            <li>• Producto original</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProductDetail 