import { useState, useEffect, useCallback } from 'react';
import { Producto } from '../types/product.type';
import { useProductos } from '../hooks/useProductos';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticulosGridProps {
    categoria: string;
    busqueda: string;
}

const ArticulosGrid = ({ categoria, busqueda }: ArticulosGridProps) => {
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const { productos, loading, error, getProductos, page, totalCount, pageSize } = useProductos();
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Cargar productos inicialmente
    useEffect(() => {
        getProductos(busqueda, categoria, 1);
    }, [busqueda, categoria, getProductos]);

    const handlePageChange = useCallback(async (newPage: number) => {
        if (newPage < 1 || newPage > Math.ceil(totalCount / pageSize)) return;
        
        setIsLoadingMore(true);
        try {
            await getProductos(busqueda, categoria, newPage);
        } finally {
            setIsLoadingMore(false);
        }
    }, [busqueda, categoria, getProductos, totalCount, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    if (loading && !isLoadingMore) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando productos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-500">Error al cargar los productos: {error}</p>
                </div>
            </div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-gray-600">No se encontraron productos</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 pb-24">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        onSelect={() => setSelectedProduct(producto)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1 || isLoadingMore}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-sm font-medium">
                        Página {page} de {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages || isLoadingMore}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default ArticulosGrid;