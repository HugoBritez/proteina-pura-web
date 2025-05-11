export interface ClientConfig {
    empresa: {
        nombre: string;
        telefono: string;
        email: string;
        direccion: string;
        logo: string;
        api_url: string;
    };
    tema: {
        colores: {
            primario: string;
            secundario: string;
            fondo: string;
            texto: string;
            subtexto: string;
        };
        fuentes: {
            principal: string;
            secundaria: string;
        };
    };
    categorias: {
        id: number;
        nombre: string;
    }[];
    redesSociales: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        whatsapp?: string;
    };
}

// Configuración por defecto
export const defaultConfig: ClientConfig = {
    empresa: {
        nombre: "Proteína Pura",
        telefono: "+54 9 11 1234-5678",
        email: "contacto@proteinapura.com",
        direccion: "Av. Corrientes 1234, CABA",
        logo: "./src/assets/media/logo_principal.png",
        api_url: "http://localhost:3000"
    },
    tema: {
        colores: {
            primario: "#EF4444", // rojo
            secundario: "#1E293B", // azul oscuro
            fondo: "#F8FAFC",
            texto: "#1E293B",
            subtexto: "#64748B"
        },
        fuentes: {
            principal: "Han Sans, Roboto, sans-serif",
            secundaria: "Montserrat, sans-serif"
        }
    },
    categorias: [
        { id: 1, nombre: "Todos" },
        { id: 2, nombre: "Proteinas" },
        { id: 3, nombre: "Creatina" },
        { id: 4, nombre: "Pre-Entreno" },
        { id: 5, nombre: "Aminoácidos" },
        { id: 6, nombre: "Suplementos" },
        { id: 7, nombre: "Accesorios" },
        { id: 8, nombre: "Otros" }
    ],
    redesSociales: {
        facebook: "https://facebook.com/proteinapura",
        instagram: "https://instagram.com/proteinapura",
        whatsapp: "https://wa.me/5491112345678"
    }
}; 