import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Drawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>

      {/* topbar  */}
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />

      {/* sidebar  */}
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />

      {/* content   */}
      <Box component="main" sx={{ p: 3, overflowX:'hidden', width:'100%', height: '100vh', bgcolor:'var(--backColor)' }}>
        <DrawerHeader />
        <Outlet />
      </Box>

    </Box>
  );
}
