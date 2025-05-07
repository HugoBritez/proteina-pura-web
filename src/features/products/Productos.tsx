import { Menu as MenuIcon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import Menu from "../../shared/ui/Menu/Menu";
import { MenuItem } from "../../shared/ui/Menu/types";
import ArticulosGrid from "./modules/ArticulosGrid";
import { useClientConfig } from "../../config/ClientConfigContext";
import { useProductos } from "./hooks/useProductos";
import { useCategorias } from "./hooks/useCategorias";

const Productos = () => {
    const { config } = useClientConfig();
    const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
    const [isMenuCategoriasOpen, setIsMenuCategoriasOpen] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<{ id: number, descripcion: string } | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const { getProductos } = useProductos();

    useEffect(() => {
        if (categorias.length > 0 && !categoriaSeleccionada) {
            setCategoriaSeleccionada(categorias[0]);
        }
    }, [categorias, categoriaSeleccionada]);

    const handleSelectCategoria = useCallback((item: MenuItem) => {
        const categoria = categorias.find(cat => cat.id === item.id);
        if (categoria) {
            setCategoriaSeleccionada(categoria);
            getProductos(
                busqueda === '' ? undefined : busqueda,
                categoria.id,
                1
            );
        }
        setIsMenuCategoriasOpen(false);
    }, [categorias, busqueda, getProductos]);

    const handleBusqueda = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusqueda(valor);
        getProductos(
            valor === '' ? undefined : valor,
            categoriaSeleccionada ? categoriaSeleccionada.id : undefined,
            1
        );
    }, [categoriaSeleccionada, getProductos]);

    if (loadingCategorias) return <div>Cargando categorías...</div>;
    if (errorCategorias) return <div>{errorCategorias}</div>;

    return (
        <div 
            className="flex flex-col w-full h-screen pt-4 rounded-b-3xl"
            style={{ backgroundColor: config.tema.colores.primario }}
        >
            <p className="text-white text-2xl font-bold text-left pl-4">
                {config.empresa.nombre}
            </p>
            <div className="flex flex-col bg-slate-50 p-2 w-full h-full mt-8 rounded-t-3xl">
                <div className="flex flex-row gap-1 items-center w-full mx-auto mt-1">
                    <input
                        type="text"
                        placeholder="Buscar articulos..."
                        value={busqueda}
                        onChange={handleBusqueda}
                        className="w-full h-12 rounded-full bg-white p-2 text-sm font-semibold text-slate-500 border border-slate-300 focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': config.tema.colores.primario } as React.CSSProperties}
                    />
                    <div className="relative">
                        <button
                            className="text-slate-500 p-2 rounded-lg transition-colors"
                            style={{ '--tw-bg-opacity': 0.8, backgroundColor: config.tema.colores.fondo } as React.CSSProperties}
                            onClick={() => setIsMenuCategoriasOpen(!isMenuCategoriasOpen)}
                        >
                            <MenuIcon size={20} />
                        </button>

                        <Menu
                            items={categorias.map(cat => ({
                                id: cat.id,
                                content: cat.descripcion
                            }))}
                            isOpen={isMenuCategoriasOpen}
                            onClose={() => setIsMenuCategoriasOpen(false)}
                            onSelect={handleSelectCategoria}
                            position="bottom"
                            className="w-48"
                        />
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-sm font-semibold text-slate-500">
                        Categoría seleccionada: {categoriaSeleccionada?.descripcion}
                    </h2>
                </div>
                <ArticulosGrid 
                    categoria={categoriaSeleccionada ? categoriaSeleccionada.id : undefined}
                    busqueda={busqueda}
                />
            </div>
        </div>
    )
}

export default Productos;