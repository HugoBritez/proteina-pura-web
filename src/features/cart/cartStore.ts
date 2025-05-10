import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateCreator } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    ((set) => ({
      items: [],
      addItem: (item: CartItem) =>
        set((state: CartStore) => {
          const existingItem = state.items.find((i: CartItem) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i: CartItem) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id: string) =>
        set((state: CartStore) => ({
          items: state.items.filter((item: CartItem) => item.id !== id),
        })),
      updateQuantity: (id: string, change: number) =>
        set((state: CartStore) => ({
          items: state.items
            .map((item: CartItem) =>
              item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + change) }
                : item
            )
            .filter((item: CartItem) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    })) as StateCreator<CartStore>,
    {
      name: 'cart-storage',
    }
  )
); 