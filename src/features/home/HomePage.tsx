"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router"
import { useProductos } from "../products/hooks/useProductos"
import { useCartStore } from "../cart/cartStore"
import { formatCurrency } from "../products/utils/formatCurrency"
import { defaultConfig } from "../../config/client.config"
import recurso3 from "../../assets/recursos/recurso3.svg"
import { Dumbbell, Zap, Truck, ShoppingBag, Instagram, Facebook, MessageCircle } from "lucide-react"

export const HomePage = () => {
  const { productos, loading, getProductos } = useProductos()
  const addToCart = useCartStore((state) => state.addItem)
  const productosRef = useRef(null)
  const isProductosInView = useInView(productosRef, { once: true, amount: 0.2 })
  const config = defaultConfig
  const fechaActual = new Date().getFullYear()
  const navigate = useNavigate()

  // Load featured products when component mounts
  useEffect(() => {
    if (productos.length === 0) {
      getProductos()
    }
  }, [productos.length, getProductos])

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with better gradient and layout */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-full min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-red-200 to-red-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('../../assets/recursos/recurso.svg')] bg-no-repeat bg-bottom bg-contain opacity-10"></div>

        <div className="container mx-auto px-4 flex flex-col items-center z-10 py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl"
          >
            <span className="text-4xl md:text-5xl">💪</span>
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white text-center mb-6 drop-shadow-lg"
            style={{ fontFamily: "'Black Han Sans', sans-serif" }}
          >
            {config.empresa.nombre.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl lg:text-4xl text-white text-center mb-12 max-w-3xl font-light drop-shadow-md"
          >
            Suplementos de alta calidad para alcanzar tus objetivos
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-500 px-10 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors text-lg md:text-xl shadow-lg"
              onClick={() => navigate("/shop")}
            >
              Descubre Nuestros Productos
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg md:text-xl"
              onClick={() => navigate("/about")}
            >
              Conoce Nuestra Historia
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      {/* Benefits Section - Modernized with icons and cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              NUESTROS BENEFICIOS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <Dumbbell size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Calidad Premium</h3>
              <p className="text-gray-600 text-lg">
                Todos nuestros productos están certificados y elaborados con ingredientes de la más alta calidad para
                garantizar resultados óptimos.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Resultados Garantizados</h3>
              <p className="text-gray-600 text-lg">
                Nuestras formulaciones están científicamente probadas para ayudarte a alcanzar tus objetivos de forma
                efectiva y segura.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Entrega Rápida</h3>
              <p className="text-gray-600 text-lg">
                Realizamos envíos a todo el país en tiempo récord para que puedas comenzar tu transformación sin
                demoras.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products - Enhanced with better cards and hover effects */}
      <motion.section
        ref={productosRef}
        initial={{ opacity: 0 }}
        animate={isProductosInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('../../assets/recursos/recurso2.svg')] bg-repeat opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isProductosInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              DESTACADOS
            </span>
            <h2 className="text-4xl font-bold text-gray-900">Productos Destacados</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros suplementos más populares y comienza tu transformación hoy mismo
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isProductosInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {productos.slice(0, 4).map((producto) => (
                <motion.div
                  key={producto.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-square relative p-4 bg-gray-50 flex items-center justify-center">
                    <img
                      src={producto.imagen || "/placeholder.png"}
                      alt={producto.nombre}
                      className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {producto.stock !== null && (
                      <div className="absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full bg-red-500 font-medium">
                        {producto.stock ? "En stock" : "Sin stock"}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{producto.descripcion}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-red-500">{formatCurrency(producto.precio)}</span>

                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          id: producto.id.toString(),
                          name: producto.nombre,
                          price: producto.precio,
                          quantity: 1,
                          image: producto.imagen || "/placeholder.png",
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors"
                    >
                      <ShoppingBag size={18} />
                      Agregar al Carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isProductosInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-red-500 text-red-500 px-8 py-3 rounded-full font-medium hover:bg-red-50 transition-colors"
            >
              Ver Todos los Productos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section - New section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              TESTIMONIOS
            </span>
            <h2 className="text-4xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4">
                  <span className="text-xl font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Martín García</h4>
                  <p className="text-gray-500 text-sm">Atleta</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Desde que comencé a usar los suplementos de Proteína Pura, mi rendimiento en el gimnasio ha mejorado
                notablemente. ¡Los resultados hablan por sí solos!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4">
                  <span className="text-xl font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-bold">Laura Sánchez</h4>
                  <p className="text-gray-500 text-sm">Entrenadora personal</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Recomiendo Proteína Pura a todos mis clientes. La calidad es excepcional y los resultados son
                consistentes. Además, el servicio al cliente es excelente."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4">
                  <span className="text-xl font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-bold">Carlos Méndez</h4>
                  <p className="text-gray-500 text-sm">Culturista</p>
                </div>
              </div>
              <p className="text-gray-700">
                "He probado muchas marcas a lo largo de mi carrera, pero ninguna se compara con la pureza y efectividad
                de estos productos. Son parte esencial de mi preparación."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Enhanced with better layout and visual elements */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
          <img src={recurso3 || "/placeholder.svg"} alt="Decoración" className="w-full h-full object-contain" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            >
              ¿Listo para comenzar tu transformación?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white text-xl md:text-2xl mb-12 opacity-90"
            >
              Únete a miles de personas que ya han alcanzado sus objetivos con nuestros suplementos de alta calidad
            </motion.p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-500 px-10 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors text-lg shadow-lg"
                onClick={() => navigate("/shop")}
              >
                Comprar Ahora
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg"
                onClick={() => navigate("/contact")}
              >
                Contactar Asesor
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#1e293b"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      {/* Footer - Enhanced with better layout and visual elements */}
      <footer className="bg-slate-800 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">💪</span>
                </div>
                <h3 className="text-2xl" style={{ fontFamily: "'Black Han Sans', sans-serif" }}>
                  {config.empresa.nombre}
                </h3>
              </div>
              <p className="text-gray-400 mb-6">
                Tu aliado en el camino hacia una vida más saludable y un rendimiento óptimo.
              </p>
              <div className="flex space-x-4">
                <a
                  href={config.redesSociales.instagram}
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={config.redesSociales.facebook}
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={config.redesSociales.whatsapp}
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Productos</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Proteínas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pre-Workout</li>
                <li className="hover:text-white transition-colors cursor-pointer">BCAA</li>
                <li className="hover:text-white transition-colors cursor-pointer">Vitaminas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Creatina</li>
                <li className="hover:text-white transition-colors cursor-pointer">Accesorios</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Inicio</li>
                <li className="hover:text-white transition-colors cursor-pointer">Tienda</li>
                <li className="hover:text-white transition-colors cursor-pointer">Sobre Nosotros</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contacto</li>
                <li className="hover:text-white transition-colors cursor-pointer">Preguntas Frecuentes</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Contacto</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-red-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@proteinapura.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-red-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>{config.empresa.telefono}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-red-400"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{config.empresa.direccion}</span>
                </li>
              </ul>

              <div className="mt-8">
                <h5 className="font-semibold mb-3 text-white">Suscríbete a nuestro newsletter</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="bg-slate-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <button className="bg-red-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 14 0"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-400">
            <p>
              &copy; {fechaActual} {config.empresa.nombre}. Todos los derechos reservados.
            </p>
            <p className="mt-2">Desarrollado con ❤️ por INSIGHT</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
