import { SocketProvider } from "./contexts/SocketContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </SocketProvider>
    </AuthContextProvider>
  </StrictMode>
);
