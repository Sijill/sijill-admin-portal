import { useTheme } from "@emotion/react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Avatar, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Bergo from "../assets/default.png";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  marginLeft: "10px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  scrollbarGutter: "stable both-edges",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideBar({ open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // data list
  const data = [
    {
      text: "Dashboard",
      icon: "bi bi-house",
      path: "/",
    },
    {
      text: "Verification Queue",
      icon: "bi bi-person-check",
      path: "/verification_queue",
    },
    {
      text: "Suspended Users",
      icon: "bi bi-person-x",
      path: "/suspended-users",
    },
    {
      text: "Audit Logs",
      icon: "bi bi-journal-text",
      path: "/audit-logs",
    },
  ];
  // user data list
  const user = [
    {
      text: "Create User",
      icon: "bi bi-person-plus",
      path: "/newuser",
    },
    {
      text: "Calendar",
      icon: "bi bi-calendar-date",
      path: "/calendar",
    },
    {
      text: "Support",
      icon: "bi bi-patch-question",
      path: "/support",
    },
  ];


  return (
    <Drawer variant="permanent" open={open} sx={{
    "& .MuiDrawer-paper": {
      borderRight: "1px solid var(--border-color)",
    },}}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider sx={{borderColor:'var(--border-color)'}}/>

      <Stack>
        <Avatar
          sx={{
            mx: "auto",
            my: "15px",
            width: open ? 66 : 44,
            height: open ? 66 : 44,
            transition: ".25s",
          }}
          alt="Remy Sharp"
          src={Bergo}
        />
        <Typography
          sx={{ fontSize: open ? "17px" : "0", transition: ".25s" }}
          align="center"
        >
          Mohamed Ibrahim
        </Typography>
        <Typography
          sx={{
            fontSize: open ? "17px" : "0",
            mb: open ? "15px" : "0",
            transition: ".25s",
            color: "var(--main-color)",
            borderRadius: "10px",
          }}
          align="center"
        >
          Admin
        </Typography>
      </Stack>

      <Divider sx={{borderColor:'var(--border-color)'}}/>

      <List
        sx={{
          px: {
            xs: "5px",
            sm: 0,
          },
        }}
      >
        {data.map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            sx={{
              display: "block",
              backgroundImage:
                location.pathname === item.path && "var(--fourthGrad)",
              color: location.pathname === item.path && "#fff",
              borderRadius: "10px",
              my: 0.25,
            }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              sx={[
                {
                  minHeight: 30,
                  height: 40,
                  p: 2,
                  borderRadius: "10px",
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: "22px",
                  ...(open
                    ? {
                        marginRight: 15,
                      }
                    : {
                        marginRight: "auto",
                      }),
                }}
              ></i>

              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{borderColor:'var(--border-color)'}}/>

      <List
        sx={{
          px: {
            xs: "5px",
            sm: 0,
          },
        }}
      >
        {user.map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            sx={{
              display: "block",
              backgroundImage:
                location.pathname === item.path && "var(--fourthGrad)",
              color: location.pathname === item.path && "#fff",
              borderRadius: "10px",
              my: 0.25,
            }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              sx={[
                {
                  minHeight: 30,
                  height: 40,
                  p: 2,
                  borderRadius: "10px",
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: "22px",
                  ...(open
                    ? {
                        marginRight: 15,
                      }
                    : {
                        marginRight: "auto",
                      }),
                }}
              ></i>

              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    
    </Drawer>
  );
}
