// src/features/auth/Auth.tsx
import { useState } from 'react';
import { supabase } from '../../shared/services/supabaseService';
import { useNavigate } from 'react-router-dom';
import { defaultConfig } from '../../config/client.config';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        <div className="flex flex-col items-center mb-4">
          <img
            src={empresa.logo}
            alt={empresa.nombre}
            className="h-16 mb-2"
            style={{ objectFit: 'contain' }}
          />
          <h1
            className="text-2xl font-bold"
            style={{ color: tema.colores.primario, fontFamily: tema.fuentes.principal }}
          >
            {empresa.nombre}
          </h1>
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
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ fontFamily: tema.fuentes.principal }}
              />
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