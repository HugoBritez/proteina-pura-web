import { Tables } from '../../../shared/types/database.types';
import { Pencil, Trash2 } from 'lucide-react';

type Producto = Tables<'productos'>;

interface ProductoCardProps {
  producto: Producto;
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

export const ProductoCard = ({ producto, onEdit, onDelete }: ProductoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <img
        src={producto.imagen || '/placeholder.png'}
        alt={producto.nombre}
        className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-base font-bold">{producto.nombre}</h2>
        <p className="text-gray-600 text-sm">{producto.stock ? 'En stock' : 'Agotado'}</p>
        <p className="text-indigo-600 font-semibold mt-1">${producto.precio}</p>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <button
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
          onClick={() => onEdit(producto)}
          title="Editar"
        >
          <Pencil className="text-blue-600" size={20} />
        </button>
        <button
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          onClick={() => onDelete(producto.id)}
          title="Eliminar"
        >
          <Trash2 className="text-red-600" size={20} />
        </button>
      </div>
    </div>
  );
}; 