"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/auth/auth-context";
import type { AuthContextValue, AuthState, User } from "@/lib/auth/auth-context";
import { authApi } from "@/lib/api/auth";

const readInitialAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false, isLoading: true };
  }
  const stored = localStorage.getItem("nexus_auth");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { user: parsed.user, isAuthenticated: true, isLoading: false };
    } catch {
      return { user: null, isAuthenticated: false, isLoading: false };
    }
  }
  return { user: null, isAuthenticated: false, isLoading: false };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(readInitialAuthState);
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const data = await authApi.login(email, password);

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        plan: data.user.plan || "pro",
        status: "active",
      };

      localStorage.setItem("nexus_auth", JSON.stringify({ user, token: data.token }));
      setState({ user, isAuthenticated: true, isLoading: false });
      router.push("/dashboard");
    } catch (error) {
      setState((s) => ({ ...s, isLoading: false }));
      throw error;
    }
  }, [router]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const data = await authApi.register({ email, password, name });

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        plan: data.user.plan || "free",
        status: "active",
      };

      localStorage.setItem("nexus_auth", JSON.stringify({ user, token: data.token }));
      setState({ user, isAuthenticated: true, isLoading: false });
      router.push("/dashboard");
    } catch (error) {
      setState((s) => ({ ...s, isLoading: false }));
      throw error;
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("nexus_auth");
    setState({ user: null, isAuthenticated: false, isLoading: false });
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
