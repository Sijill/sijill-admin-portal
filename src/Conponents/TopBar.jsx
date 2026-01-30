// hooks
import { useContext, useState } from "react";
// mui Componens
import { Box, IconButton, Stack, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
// context
import { Mode } from "../Context/ModeContextCreation";

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "inherit",
}));

export default function TopBar({ open, handleDrawerOpen }) {
  const { mode, setMode } = useContext(Mode);

  // handle mode
  const handleMode = () => {
    const newMood = mode === "light" ? "dark" : "light";
    (setMode(newMood), localStorage.setItem("colorMode", newMood));
  };

  // handle full screen
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <StyledAppBar
      className="
          backdrop-blur-md
          border-b border-(--border-color)
        "
      sx={{ bgcolor: mode == 'light' ? "#ffffff4f" : '#0000', boxShadow: 0, color: 'var(--main-color)' }}
      position="fixed"
      open={open}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            { marginRight: 5, width: "40px", height: "40px" },
            open && { display: "none" },
          ]}
        >
          <i className="bi bi-three-dots-vertical"></i>
        </IconButton>

    <Logo>
      <Box
        sx={{
          width: '100px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          padding: '1px',
        }}
      >
        <img
          src="/src/assets/logo_light-removebg.png"
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Logo>
        <Box flexGrow={1}></Box>

        <Stack alignItems={"center"} direction={"row"}>
          <IconButton
            sx={{ width: "40px", height: "40px" }}
            color="inherit"
            onClick={() => handleMode()}
          >
            {mode === "light" ? (
              <i className="bi bi-moon-stars"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </IconButton>

          <IconButton color="inherit" sx={{ width: "40px", height: "40px" }}>
            <i className="bi bi-bell"></i>
          </IconButton>


          <IconButton color="inherit" sx={{ width: "40px", height: "40px" }}>
            <i className="bi bi-person"></i>
          </IconButton>

          <IconButton
            color="inherit"
            sx={{ width: "40px", height: "40px" }}
            onClick={handleFullScreen}
            title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
          >
            {isFullScreen ? (
              <i className="bi bi-fullscreen-exit"></i>
            ) : (
              <i className="bi bi-fullscreen"></i>
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}