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
        if (categorias?.length > 0 && !categoriaSeleccionada) {
            setCategoriaSeleccionada({ id: 0, descripcion: "Todos" });
        }
    }, [categorias, categoriaSeleccionada]);

    const handleSelectCategoria = useCallback((item: MenuItem) => {
        if (item.id === 0) {
            setCategoriaSeleccionada({ id: 0, descripcion: "Todos" });
            getProductos(
                busqueda === '' ? undefined : busqueda,
                undefined,
                1
            );
        } else {
            const categoria = categorias?.find(cat => cat.id === item.id);
            if (categoria) {
                setCategoriaSeleccionada(categoria);
                getProductos(
                    busqueda === '' ? undefined : busqueda,
                    categoria.id,
                    1
                );
            }
        }
        setIsMenuCategoriasOpen(false);
    }, [categorias, busqueda, getProductos]);

    const handleBusqueda = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusqueda(valor);
        getProductos(
            valor === '' ? undefined : valor,
            categoriaSeleccionada?.id === 0 ? undefined : categoriaSeleccionada?.id,
            1
        );
    }, [categoriaSeleccionada, getProductos]);

    // if (loadingCategorias) return <div>Cargando categorías...</div>;
    // if (errorCategorias) return <div>{errorCategorias}</div>;

    const categoriasOrdenadas = [
        { id: 0, descripcion: "Todos" },
        ...(categorias || [])
            .filter(cat => cat.descripcion !== "Todos")
            .sort((a, b) => a.descripcion.localeCompare(b.descripcion))
    ];

    return (
        <div 
            className="flex flex-col w-full h-screen  md:pt-0 rounded-b-3xl"        >
            <img src={config.empresa.logo} alt={config.empresa.nombre} className="h-16 w-full cursor-pointer  object-cover lg:hidden" />

            <div className="flex flex-col bg-slate-50 p-2 w-full h-full mt-4 md:mt-0 rounded-t-3xl">
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
                            items={loadingCategorias 
                                ? [{ id: -1, content: "Cargando categorías..." }]
                                : errorCategorias 
                                    ? [{ id: -1, content: errorCategorias }]
                                    : categoriasOrdenadas.map(cat => ({
                                        id: cat.id,
                                        content: cat.descripcion
                                    }))
                            }
                            isOpen={isMenuCategoriasOpen}
                            onClose={() => setIsMenuCategoriasOpen(false)}
                            onSelect={handleSelectCategoria}
                            position="bottom"
                            className="w-48"
                        />
                    </div>
                </div>
                <div className="p-4 md:hidden">
                    <h2 className="text-sm font-semibold text-slate-500">
                        Categoría seleccionada: {categoriaSeleccionada?.descripcion}
                    </h2>
                </div>
                <ArticulosGrid 
                    categoria={categoriaSeleccionada?.id === 0 ? undefined : categoriaSeleccionada?.id}
                    busqueda={busqueda}
                />
            </div>
        </div>
    )
}

export default Productos;