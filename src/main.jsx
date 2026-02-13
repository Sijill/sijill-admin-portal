import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import ModeProvider from "./Context/ModeContext.jsx";
import AuthProvider from "./Context/AuthContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModeProvider>
          <App />
        </ModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
