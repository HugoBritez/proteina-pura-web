export interface MenuItem {
  id: string | number;
  content: React.ReactNode;
  [key: string]: any;
}

export interface MenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MenuItem) => void;
  position?: 'top' | 'bottom';
  className?: string;
} 