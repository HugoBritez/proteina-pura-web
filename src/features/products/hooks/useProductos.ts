import { useState, useCallback, useRef } from 'react';
import { Producto } from '../types/product.type';
import { productsApi } from '../services/productsApi';

interface CacheItem {
    data: Producto[];
    count: number;
    timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const DEBOUNCE_DELAY = 500; // 500ms

export const useProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    // Cache para almacenar resultados
    const cache = useRef<Record<string, CacheItem>>({});
    const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    const getCacheKey = (nombre?: string, categoria?: string, page: number = 1) => {
        return `${nombre || ''}-${categoria || ''}-${page}`;
    };

    const isCacheValid = (cacheItem: CacheItem) => {
        return Date.now() - cacheItem.timestamp < CACHE_DURATION;
    };

    const getProductos = useCallback(async (nombre?: string, categoria?: string, pageParam: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const cacheKey = getCacheKey(nombre, categoria, pageParam);
            const cachedData = cache.current[cacheKey];

            if (cachedData && isCacheValid(cachedData)) {
                console.log('Usando datos en caché para:', cacheKey);
                setProductos(cachedData.data);
                setTotalCount(cachedData.count);
                setPage(pageParam);
                return;
            }

            console.log('Parámetros recibidos en hook:', { nombre, categoria, pageParam });
            const { data, count } = await productsApi.getProducts({
                nombre,
                categoria,
                page: pageParam,
                pageSize
            });

            // Actualizar caché
            cache.current[cacheKey] = {
                data,
                count: count || 0,
                timestamp: Date.now()
            };

            setProductos(data);
            setTotalCount(count || 0);
            setPage(pageParam);
        } catch (err) {
            console.error('Error en getProductos:', err);
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedGetProductos = useCallback((nombre?: string, categoria?: string, pageParam: number = 1) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            getProductos(nombre, categoria, pageParam);
        }, DEBOUNCE_DELAY);
    }, [getProductos]);

    return {
        productos,
        loading,
        error,
        page,
        totalCount,
        pageSize,
        getProductos: debouncedGetProductos
    };
};
