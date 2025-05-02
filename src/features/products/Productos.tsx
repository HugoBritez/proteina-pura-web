import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import Menu from "../../shared/ui/Menu/Menu";
import { MenuItem } from "../../shared/ui/Menu/types";
import ArticulosGrid from "./modules/ArticulosGrid";
import { useClientConfig } from "../../config/ClientConfigContext";

const Productos = () => {
    const { config } = useClientConfig();
    const [isMenuCategoriasOpen, setIsMenuCategoriasOpen] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(config.categorias[0]);

    const handleSelectCategoria = (item: MenuItem) => {
        const categoria = config.categorias.find(cat => cat.id === item.id);
        if (categoria) {
            setCategoriaSeleccionada(categoria);
        }
        setIsMenuCategoriasOpen(false);
    };

    return (
        <div 
            className="flex flex-col w-full h-screen pt-8 rounded-b-3xl"
            style={{ backgroundColor: config.tema.colores.primario }}
        >
            <div className="flex flex-col bg-slate-50 p-2 w-full h-full mt-8 rounded-t-3xl">
                <div className="flex flex-row gap-1 items-center w-full mx-auto mt-1">
                    <input
                        type="text"
                        placeholder="Buscar articulos..."
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
                            items={config.categorias.map(cat => ({
                                id: cat.id,
                                content: cat.nombre
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
                        Categoría seleccionada: {categoriaSeleccionada.nombre}
                    </h2>
                </div>
                <ArticulosGrid />
            </div>
        </div>
    )
}

export default Productos;