import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuProps, MenuItem } from './types';

const Menu: React.FC<MenuProps> = ({
  items,
  isOpen,
  onClose,
  onSelect,
  position = 'bottom',
  className = '',
}) => {
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: position === 'bottom' ? -10 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: position === 'bottom' ? -10 : 10,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
          />
          <motion.div
            className={`absolute ${position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'} right-0 w-48 bg-white rounded-lg shadow-lg z-50 ${className}`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="py-1">
              {items.map((item: MenuItem) => (
                <motion.div
                  key={item.id}
                  className="px-4 py-2 cursor-pointer text-gray-800"
                  onClick={() => onSelect(item)}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  {item.content}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
