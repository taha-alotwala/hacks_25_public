import { createContext, useContext, useEffect, useState, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";
import { toast } from "react-toastify";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notif, setNotif] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    } else {
      setSocket(null);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("price-update", ({ product }) => {
      toast.info(`${product.name} is now available at ${product.price}`);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ msg: "Hello", socket, notif }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
