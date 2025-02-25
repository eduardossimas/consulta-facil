"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "medico" | "paciente" | null;

interface User {
  id: number;
  name: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Recupera o usuário do localStorage, se existir
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Armazena o usuário no localStorage sempre que ele mudar
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", { // Certifique-se de que a rota está correta
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        return false;
      }
  
      const data = await response.json();
      setUser({ id: data.id, name: data.name, role: data.role, token: data.token });
      return true;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      return false;
    }
  };  

  // Função de logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};