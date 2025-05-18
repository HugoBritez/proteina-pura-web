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
        nombre: "Proteina Pura",
        telefono: "+595 983 312 502",
        email: "proteinapurapy@gmail.com",
        direccion: "Dr.Blas Garay, Cnel. Oviedo 050101, Paraguay",
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
            principal: "Black Han Sans, Roboto, sans-serif",
            secundaria: "Montserrat, sans-serif"
        }
    },
    redesSociales: {
        facebook: "https://www.facebook.com/profile.php?id=61552400132945&locale=es_LA",
        instagram: "https://www.instagram.com/proteinapurapy",
        whatsapp: "wa.me/595983312502"
    }
}; 