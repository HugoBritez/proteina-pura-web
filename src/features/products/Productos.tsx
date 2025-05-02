import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import Menu from "../../shared/ui/Menu/Menu";
import { MenuItem } from "../../shared/ui/Menu/types";
import ArticulosGrid from "./modules/ArticulosGrid";
interface Categoria {
    id: number;
    nombre: string;
}

const categorias: Categoria[] = [
    { id: 1, nombre: "Todos" },
    { id: 2, nombre: "Proteinas" },
    { id: 3, nombre: "Creatina" },
    { id: 4, nombre: "Pre-Entreno" },
    { id: 5, nombre: "Aminoácidos" },
    { id: 6, nombre: "Suplementos" },
    { id: 7, nombre: "Accesorios" },
    { id: 8, nombre: "Otros" },
]

const Productos = () => {
    const [isMenuCategoriasOpen, setIsMenuCategoriasOpen] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria>(categorias[0]);

    const handleSelectCategoria = (item: MenuItem) => {
        const categoria = categorias.find(cat => cat.id === item.id);
        if (categoria) {
            setCategoriaSeleccionada(categoria);
        }
        setIsMenuCategoriasOpen(false);
    };

    return (
        <div className="flex flex-col w-full h-screen bg-red-500 pt-8 rounded-b-3xl">
            <div className="flex flex-row gap-2 items-center w-[90%] mx-auto">
                <input 
                    type="text" 
                    placeholder="Buscar articulos..." 
                    className="w-full h-10 rounded-lg bg-white p-2 text-sm font-semibold text-slate-500 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
                <div className="relative">
                    <button 
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => setIsMenuCategoriasOpen(!isMenuCategoriasOpen)}
                    >
                        <MenuIcon size={20} />
                    </button>
                    
                    <Menu
                        items={categorias.map(cat => ({
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
            <div className="flex flex-col bg-slate-50 p-2 w-full h-full mt-8 rounded-t-3xl">
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