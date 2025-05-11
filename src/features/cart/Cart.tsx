import { FC, useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore } from './cartStore';
import CheckoutModal from './CheckoutModal';

const Cart: FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total: number, item) => total + item.price * item.quantity, 0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Carrito de Compras</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
          <p className="text-gray-500 text-sm mt-2">Agrega algunos productos para comenzar</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toLocaleString('es-PY', { style: 'currency', currency: 'PYG' })}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Total de Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-base sm:text-lg font-semibold">Total a Pagar:</span>
              <span className="text-lg sm:text-xl font-bold text-blue-600">
                ${calculateTotal().toLocaleString('es-PY', { style: 'currency', currency: 'PYG' })}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => clearCart()}
                className="flex-1 bg-red-600 text-white py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                Cancelar Pedido
              </button>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="flex-1 bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </>
      )}

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Cart;
