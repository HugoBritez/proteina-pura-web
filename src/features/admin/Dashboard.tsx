import { useEffect, useState } from 'react';
import { supabase } from '../../shared/services/supabaseService';
import { useNavigate } from 'react-router-dom';
import { defaultConfig } from '../../config/client.config';
import { Tables } from '../../shared/types/database.types';
import { ProductoForm } from './components/ProductoForm';
import { ProductoCard } from './components/ProductoCard';
import { DeleteModal } from './components/DeleteModal';
import { Modal } from './components/Modal';

type Producto = Tables<'productos'>;

export const Dashboard = () => {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id?: number }>({ open: false });
  const navigate = useNavigate();

  // Verificación de admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error || !data?.is_admin) {
        navigate('/login');
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    };
    checkAdmin();
  }, [navigate]);

  // Obtener productos
  useEffect(() => {
    if (isAdmin) fetchProductos();
    // eslint-disable-next-line
  }, [isAdmin]);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) setError('Error al cargar productos');
    else setProductos(data || []);
  };

  const openModal = (producto?: Producto) => {
    setEditando(producto || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditando(null);
    setError(null);
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    try {
      // Obtener el producto para eliminar su imagen
      const { data: producto } = await supabase
        .from('productos')
        .select('imagen')
        .eq('id', deleteModal.id)
        .single();

      // Si el producto tiene una imagen, eliminarla
      if (producto?.imagen) {
        const fileName = producto.imagen.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('productos')
            .remove([fileName]);
        }
      }

      // Eliminar el producto
      await supabase.from('productos').delete().eq('id', deleteModal.id);
      setDeleteModal({ open: false });
      fetchProductos();
    } catch (error) {
      setError('Error al eliminar el producto');
    }
  };

  if (checking) return <div className="text-center mt-10">Cargando...</div>;
  if (!isAdmin) return null;

  return (
    <div 
      className="min-h-screen py-8 px-2"
      style={{ backgroundColor: defaultConfig.tema.colores.fondo }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: defaultConfig.tema.colores.primario }}
          >
            Gestión de Productos
            <button
              className="p-2 rounded-full hover:bg-opacity-10 transition"
              style={{ 
                backgroundColor: `${defaultConfig.tema.colores.primario}20`,
                color: defaultConfig.tema.colores.primario
              }}
              onClick={() => openModal()}
              title="Crear nuevo producto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </h1>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex flex-col gap-4">
          {productos.map((prod) => (
            <ProductoCard
              key={prod.id}
              producto={prod}
              onEdit={openModal}
              onDelete={(id) => setDeleteModal({ open: true, id })}
            />
          ))}
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={editando ? 'Editar producto' : 'Crear producto'}
        >
          <ProductoForm
            producto={editando || undefined}
            onClose={closeModal}
            onSuccess={() => {
              closeModal();
              fetchProductos();
            }}
          />
        </Modal>

        <DeleteModal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false })}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;