import React from 'react';
import recurso1 from '../../assets/recursos/recurso.svg';
import recurso2 from '../../assets/recursos/recurso2.svg';
import recurso3 from '../../assets/recursos/recurso3.svg';
import { useProductos } from '../products/hooks/useProductos';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCartStore } from '../cart/cartStore';
import { formatCurrency } from '../products/utils/formatCurrency';
import { defaultConfig } from '../../config/client.config';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const { productos, loading, getProductos } = useProductos();
  const addToCart = useCartStore(state => state.addItem);
  const productosRef = useRef(null);
  const isProductosInView = useInView(productosRef, { once: true, amount: 0.2 });
  const config  = defaultConfig;
  const fechaActual = new Date().getFullYear();
  const navigate = useNavigate();

  // Cargar productos destacados al montar el componente
  React.useEffect(() => {
    if (productos.length === 0) {
      getProductos();
    }
  }, [productos.length, getProductos]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-full min-h-screen items-center justify-center bg-gradient-to-b from-red-100 to-[#EF4444] relative overflow-hidden"
      >
        <div className="container mx-auto px-4 flex flex-col items-center z-10">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl  text-white text-center mb-8"
            style={{fontFamily: "'Black Han Sans', sans-serif"}}
          >
            {config.empresa.nombre.toUpperCase()}
          </motion.h1>
          <motion.p 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl text-white text-center mb-12 max-w-3xl"
          >
            Suplementos de alta calidad para alcanzar tus objetivos
          </motion.p>
          <motion.button 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-500 px-12 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors text-xl md:text-2xl cursor-pointer"
            onClick={() => navigate('/shop')}
          >
            Descubre Nuestros Productos
          </motion.button>
        </div>
        <img src={recurso1} alt="Decoración" className="absolute bottom-0 left-0 w-full h-auto opacity-20" />
      </motion.section>

      {/* Beneficios Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
          >
            ¿Por qué elegirnos?
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={itemVariants} className="text-center p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-red-500 text-6xl mb-6">💪</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Calidad Premium</h3>
              <p className="text-gray-600 text-lg">Productos certificados y de la más alta calidad</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-red-500 text-6xl mb-6">⚡</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Resultados Garantizados</h3>
              <p className="text-gray-600 text-lg">Formulaciones científicamente probadas</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-red-500 text-6xl mb-6">🚚</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Entrega Rápida</h3>
              <p className="text-gray-600 text-lg">Envíos a todo el país en tiempo récord</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Productos Destacados */}
      <motion.section 
        ref={productosRef}
        initial={{ opacity: 0 }}
        animate={isProductosInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 md:py-24 bg-slate-50 relative overflow-hidden"
      >
        <img src={recurso2} alt="Decoración" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={isProductosInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            Productos Destacados
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isProductosInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {loading ? (
              <div className="col-span-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : (
              productos.slice(0, 4).map((producto) => (
                <motion.div
                  key={producto.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="aspect-square relative">
                    <img 
                      src={producto.imagen || '/placeholder.png'} 
                      alt={producto.nombre} 
                      className="w-full h-full object-contain p-2"
                    />
                    {producto.stock !== null && (
                      <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full bg-red-500">
                        {producto.stock ? 'En stock' : 'Sin stock'}
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2">{producto.nombre}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{producto.descripcion}</p>
                    <div className="flex flex-col gap-2">
                      <span className="text-base md:text-lg font-bold text-red-500">
                        {formatCurrency(producto.precio)}
                      </span>
                      <button 
                        onClick={() => addToCart({
                          id: producto.id.toString(),
                          name: producto.nombre,
                          price: producto.precio,
                          quantity: 1,
                          image: producto.imagen || '/placeholder.png'
                        })}
                        className="w-full bg-red-500 text-white text-xs md:text-sm px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-red-500 relative overflow-hidden"
      >
        <img src={recurso3} alt="Decoración" className="absolute bottom-0 left-0 w-1/3 h-auto opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            ¿Listo para comenzar tu transformación?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white text-2xl md:text-3xl mb-12 max-w-3xl mx-auto"
          >
            Únete a miles de personas que ya han alcanzado sus objetivos
          </motion.p>
          <motion.button 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white text-red-500 px-12 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors text-xl md:text-2xl cursor-pointer"
            onClick={() => navigate('/shop')}
          >
            Comprar Ahora
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl  mb-6" style={{fontFamily: "'Black Han Sans', sans-serif"}}>
                {config.empresa.nombre}
              </h3>
              <p className="text-gray-400 text-lg">Tu aliado en el camino hacia una vida más saludable</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Productos</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li>Proteínas</li>
                <li>Pre-Workout</li>
                <li>BCAA</li>
                <li>Vitaminas</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Contacto</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li>Email: info@proteinapura.com</li>
                <li>Tel: {config.empresa.telefono}</li>
                <li>Direccion: {config.empresa.direccion}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Síguenos</h4>
              <div className="flex space-x-6 text-lg">
                <a href={`${config.redesSociales.instagram}`} className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href={`${config.redesSociales.facebook}`} className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href={`${config.redesSociales.whatsapp}`} className="text-gray-400 hover:text-white transition-colors">Whatsapp</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-lg">
            <p>&copy;{fechaActual} Proteína Pura. Todos los derechos reservados.</p>
            <p>Desarrollado por INSIGHT</p>
          </div>
        </div>
      </footer>
    </div>
  )
}