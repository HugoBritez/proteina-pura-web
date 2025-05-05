import { motion, AnimatePresence } from 'framer-motion';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative"
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h2 className="text-lg font-bold mb-4 text-center">¿Eliminar producto?</h2>
            <p className="mb-4 text-center text-gray-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                onClick={onConfirm}
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 