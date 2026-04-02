
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getGuestCart, clearGuestCart } from "../utils/guestCart";
import api from "../api/api";

interface User {
  id?: number;
  username?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get<User>("/auth/me/");
        setUser(res.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post<{ access: string; refresh: string }>("/auth/login/", {
      username,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // Fetch user info
    const userRes = await api.get<User>("auth/me/");
    setUser(userRes.data);

    // 🔹 Merge Guest Cart
    const guestCart = getGuestCart();
    if (guestCart.length > 0) {
      try {
        await api.post("/cart/merge/", {
           items: guestCart }, // match backend schema: product_id + quantity
          );

        clearGuestCart(); // clear local guest cart
      } catch (err) {
        console.error("Failed to merge guest cart:", err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;