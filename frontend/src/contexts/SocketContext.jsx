import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {}, []);

  return (
    <SocketContext.Provider value={{ msg: "Hello" }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
