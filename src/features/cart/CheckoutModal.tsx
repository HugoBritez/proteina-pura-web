import { FC, useState } from 'react';
import { useCartStore } from './cartStore';
import { Modal } from '../admin/components/Modal';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal: FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
    const items = useCartStore(state => state.items);
    const clearCart = useCartStore(state => state.clearCart);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        documento: '',
        ciudad: '',
        direccion: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Crear mensaje para WhatsApp
        const itemsList = items.map(item =>
            `- ${item.name} x${item.quantity} (${item.price.toLocaleString('es-PY', { style: 'currency', currency: 'PYG' })})`
        ).join('\n');

        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const message = `¡Hola! Quiero realizar el siguiente pedido:\n\n${itemsList}\n\nTotal: ${total.toLocaleString('es-PY', { style: 'currency', currency: 'PYG' })}\n\nDatos de entrega:\nNombre: ${formData.nombre}\nTeléfono: ${formData.telefono}\nCI/RUC: ${formData.documento}\nCiudad: ${formData.ciudad}\nDirección: ${formData.direccion}`;

        // Abrir WhatsApp con el mensaje
        const whatsappUrl = `https://wa.me/595982373124?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Limpiar el carrito y cerrar el modal
        clearCart();
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Completar Pedido">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono de Contacto
                    </label>
                    <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        CI/RUC
                    </label>
                    <input
                        type="text"
                        name="documento"
                        required
                        value={formData.documento}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                    </label>
                    <input
                        type="text"
                        name="ciudad"
                        required
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de Entrega
                    </label>
                    <input
                        type="text"
                        name="direccion"
                        required
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Enviar Pedido por WhatsApp
                </button>
            </form>
        </Modal>
    );
};

export default CheckoutModal; 