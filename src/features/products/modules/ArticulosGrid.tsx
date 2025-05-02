import ProductoFoto from './../../../assets/productos/image.png'
import ProductCard from './ProductCard'
import { useState } from 'react'
import ProductDetail from './ProductDetail'

interface Product {
    image: string
    name: string
    price: number
    description?: string
    rating?: number
    stock?: number
}

const ArticulosGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const products = [
        {
            image: ProductoFoto,
            name: "Proteina Elite",
            price: 150000,
            description: "Proteína de suero de leche de alta calidad con 30g de proteína por porción",
            rating: 4,
            stock: 8
        },
        // Ejemplo de productos adicionales para probar el grid
        {
            image: ProductoFoto,
            name: "Proteina Elite Chocolate",
            price: 150000,
            description: "Proteína de suero de leche sabor chocolate",
            rating: 5,
            stock: 3
        },
        {
            image: ProductoFoto,
            name: "Proteina Elite Vainilla",
            price: 150000,
            description: "Proteína de suero de leche sabor vainilla",
            rating: 4,
            stock: 15
        }
    ]

    return (
        <>
            <div className="container mx-auto px-2 sm:px-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            {...product}
                            onSelect={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <ProductDetail 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
        </>
    )
}

export default ArticulosGrid