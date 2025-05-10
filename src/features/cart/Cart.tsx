import { FC } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore, CartItem } from './cartStore';

const Cart: FC = () => {
  const { items, updateQuantity, removeItem } = useCartStore();

  const calculateTotal = () => {
    return items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

      {items.length === 0 ? (
        <p className="text-center py-8 text-gray-600">
          Tu carrito está vacío
        </p>
      ) : (
        <>
          {items.map((item: CartItem) => (
            <div key={item.id} className="mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-red-50 text-red-500 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))}

          <div className="mt-8 text-right">
            <p className="text-xl font-semibold mb-4">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <button
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
