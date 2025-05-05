// src/features/auth/Auth.tsx
import { useState } from 'react';
import { supabase } from '../../shared/services/supabaseService';
import { useNavigate } from 'react-router-dom';
import { defaultConfig } from '../../config/client.config';
import { Eye, EyeOff } from 'lucide-react';
import  LogoPrincipal  from '../../assets/productos/media/logo_completo.png';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { empresa, tema } = defaultConfig;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: tema.colores.fondo }}
    >
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="flex flex-col items-center mb-4 justify-center">
          <img
            src={LogoPrincipal}
            alt={empresa.nombre}
            className="h-72 mb-2"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-2">
          Iniciar sesión
        </h2>
        <form className="mt-4 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ fontFamily: tema.fuentes.principal }}
              />
            </div>
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Contraseña"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ fontFamily: tema.fuentes.principal }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
            style={{
              background: tema.colores.primario,
              fontFamily: tema.fuentes.principal,
            }}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};