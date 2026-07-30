"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { AuthUser } from "@/types/auth";
import { setAuthToken } from "@/services/api/apiClient";
import {
  login as loginRequest,
  registerVisitor,
  googleAuth as googleAuthRequest,
  refreshAccessToken,
  fetchMe,
  logout as logoutRequest,
} from "@/services/api/authService";

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true while the silent-refresh-on-mount is in flight
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Re-fetches the current user — used after OTP verification, since
   * isEmailVerified flips server-side and the local copy needs to catch up. */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyToken = useCallback((token: string | null) => {
    setAccessToken(token);
    setAuthToken(token);
  }, []);

  // On first load, try to silently resume a session from the httpOnly
  // refresh cookie — this is what makes chat "stay logged in" across visits
  // without ever appearing on the public site as a login requirement.
  useEffect(() => {
    let cancelled = false;
    async function resume() {
      const token = await refreshAccessToken();
      if (!token) {
        if (!cancelled) setIsLoading(false);
        return;
      }
      applyToken(token);
      try {
        const me = await fetchMe();
        if (!cancelled) setUser(me);
      } catch {
        applyToken(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    resume();
    return () => {
      cancelled = true;
    };
  }, [applyToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken: token, user: loggedInUser } = await loginRequest({ email, password });
      applyToken(token);
      setUser(loggedInUser);
    },
    [applyToken]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const { accessToken: token, user: newUser } = await registerVisitor({ name, email, password });
      applyToken(token);
      setUser(newUser);
    },
    [applyToken]
  );

  const loginWithGoogle = useCallback(
    async (idToken: string) => {
      const { accessToken: token, user: googleUser } = await googleAuthRequest(idToken);
      applyToken(token);
      setUser(googleUser);
    },
    [applyToken]
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      applyToken(null);
      setUser(null);
    }
  }, [applyToken]);

  const refreshUser = useCallback(async () => {
    const me = await fetchMe();
    setUser(me);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
