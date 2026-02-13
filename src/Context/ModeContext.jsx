import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Mode } from "./ModeContextCreation";

export default function ModeProvider({ children }) {
  const localModeColor = localStorage.getItem("colorMode");
  const [mode, setMode] = useState(localModeColor || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("mood", mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: '"Nunito", sans-serif',
    },
  });

  let value = { mode, setMode };
  return (
    <Mode.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Mode.Provider>
  );
}
