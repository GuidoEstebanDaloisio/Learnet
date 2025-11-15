import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { obtenerPerfil } from "../services/authService";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<any>(null); // Datos del token (id, rol, email)
  const [perfil, setPerfil] = useState<any>(null); // Datos completos del usuario desde backend
  const [cargando, setCargando] = useState(true);

  // ------ Cargar sesión desde localStorage ------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setUsuario(decoded);

      // Cargar perfil desde backend
      obtenerPerfil(token)
        .then((data) => setPerfil(data))
        .catch(() => logout());
    } catch (err) {
      console.error("Token inválido");
      logout();
    } finally {
      setCargando(false);
    }
  }, []);

  // ------ LOGIN ------
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUsuario(decoded);

    // Traemos datos reales del usuario
    try {
      const data = await obtenerPerfil(token);
      setPerfil(data);
    } catch (error) {
      console.error("Error obteniendo perfil");
    }
  };

  // ------ LOGOUT ------
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    setPerfil(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, perfil, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};
