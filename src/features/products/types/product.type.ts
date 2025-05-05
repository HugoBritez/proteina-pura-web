export interface Producto {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: number;
    imagen: string | null;
    categoria: string | null;
    stock: boolean | null;
}