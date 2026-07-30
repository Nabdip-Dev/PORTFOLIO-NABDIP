"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext<Socket | null>(null);

/**
 * Opens exactly one Socket.IO connection once the user is authenticated
 * (login/register only happens through the chat modal, so this connects
 * only when someone has actually opted into chat). Tears down on logout.
 */
export function SocketProvider({ children }: { children: ReactNode }) {
  const { accessToken, isAuthenticated, user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [, forceRender] = useState(0);

  const canConnect = isAuthenticated && Boolean(accessToken) && (user?.role === "admin" || user?.isEmailVerified);

  useEffect(() => {
    if (!canConnect) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      forceRender((n) => n + 1);
      return;
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      auth: { token: accessToken },
      transports: ["websocket"],
    });
    socketRef.current = socket;
    forceRender((n) => n + 1);

    return () => {
      socket.disconnect();
    };
  }, [canConnect, accessToken]);

  return <SocketContext.Provider value={socketRef.current}>{children}</SocketContext.Provider>;
}

export function useSocket(): Socket | null {
  return useContext(SocketContext);
}
