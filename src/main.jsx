import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// css 
import "./index.css";
import App from "./App.jsx";
// router 
import { BrowserRouter } from "react-router-dom";
// bootstrap icons 
import "bootstrap-icons/font/bootstrap-icons.css";
// context 
import ModeProvider from "./Context/ModeContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <App />
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>
);
