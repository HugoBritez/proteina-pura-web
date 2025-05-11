import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface NotificationProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export const Notification = ({ message, isVisible }: NotificationProps) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="fixed bottom-4 right-4 z-[1000]"
                >
                    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]">
                        <CheckCircle2 className="text-green-500" size={24} />
                        <p className="text-gray-800">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}; 