import { useState } from 'react';
import { Tables, TablesInsert } from '../../../shared/types/database.types';
import { defaultConfig } from '../../../config/client.config';
import { supabase } from '../../../shared/services/supabaseService';

type Producto = Tables<'productos'>;
type ProductoInput = TablesInsert<'productos'>;

interface ProductoFormProps {
  producto?: Producto;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm: ProductoInput = {
  nombre: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  categoria: '',
  stock: true,
};

export const ProductoForm = ({ producto, onClose, onSuccess }: ProductoFormProps) => {
  const [form, setForm] = useState<ProductoInput>(producto || initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('productos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('productos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      const fileName = imageUrl.split('/').pop();
      if (!fileName) return;

      const { error } = await supabase.storage
        .from('productos')
        .remove([fileName]);

      if (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagenUrl = form.imagen;

      if (selectedFile) {
        if (producto?.imagen) {
          await deleteImage(producto.imagen);
        }
        imagenUrl = await uploadImage(selectedFile);
      }

      const formData = {
        ...form,
        imagen: imagenUrl,
      };

      if (producto) {
        const { error } = await supabase
          .from('productos')
          .update(formData)
          .eq('id', producto.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('productos')
          .insert([formData]);
        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      setError('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="w-full border rounded px-3 py-2"
          value={form.descripcion ?? ''}
          onChange={e => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="precio">
          Precio
        </label>
        <input
          id="precio"
          type="number"
          className="w-full border rounded px-3 py-2"
          value={form.precio}
          onChange={e => setForm({ ...form, precio: Number(e.target.value) })}
          required
          min={0}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imagen">
          Imagen
        </label>
        <div className="relative">
          <input
            id="imagen"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
              }
            }}
          />
          <label
            htmlFor="imagen"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            style={{ 
              borderColor: defaultConfig.tema.colores.primario,
              color: defaultConfig.tema.colores.primario
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <svg 
                className="w-8 h-8 mb-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">
                {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
              </span>
            </div>
          </label>
        </div>
        {uploadingImage && (
          <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>
        )}
        {form.imagen && !selectedFile && (
          <div className="mt-2">
            <img
              src={form.imagen}
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="categoria">
          Categoría
        </label>
        <input
          id="categoria"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.categoria ?? ''}
          onChange={e => setForm({ ...form, categoria: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Stock:</span>
        <button
          type="button"
          className={`relative inline-flex h-8 w-16 border-2 border-gray-300 rounded-full transition-colors duration-300 focus:outline-none ${
            form.stock ? 'bg-green-500 border-green-500' : 'bg-gray-200'
          }`}
          onClick={() => setForm({ ...form, stock: !form.stock })}
          aria-pressed={!!form.stock}
        >
          <span
            className={`inline-block h-7 w-7 rounded-full bg-white shadow transform transition-transform duration-300 ${
              form.stock ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`ml-2 text-sm font-medium ${form.stock ? 'text-green-600' : 'text-gray-500'}`}>
          {form.stock ? 'En stock' : 'Sin stock'}
        </span>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Guardando...' : producto ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  );
}; 