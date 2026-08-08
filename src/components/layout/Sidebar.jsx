import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Dashboard,
  Home,
  People,
  Category,
  Recycling,
  Payments,
  Redeem,
  Assessment,
  Settings,
  Logout,
} from "@mui/icons-material";

const menus = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    text: "Rumah",
    path: "/rumah",
    icon: <Home />,
  },
  {
    text: "Nasabah",
    path: "/nasabah",
    icon: <People />,
  },
    {
    text: "Jenis Sampah",
    path: "/jenis-sampah",
    icon: <Category />,
  },
  {
    text: "Setoran",
    path: "/setoran",
    icon: <Recycling />,
  },
  {
    text: "Penarikan",
    path: "/penarikan",
    icon: <Payments />,
  },
  {
    text: "Reward",
    path: "/reward",
    icon: <Redeem />,
  },
{
  text: "Laporan",
  path: "/laporan/setoran",
  icon: <Assessment />,
},
  {
    text: "Pengaturan",
    path: "/settings",
    icon: <Settings />,
  },
];

export default function Sidebar({
  drawerWidth = 260,
  mobileOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <>
<Toolbar
  sx={{
    justifyContent: "center",
    py: 2,
  }}
>
  <Box
    component="img"
    src="/images/logo-sipilah.png"
    alt="SIPILAH"
    sx={{
      width: 130,
      height: "auto",
      display: "block",
      mx: "auto",
    }}
  />
</Toolbar>

      <Divider />

      <List>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.text}
            selected={location.pathname === menu.path}
            onClick={() => {
              navigate(menu.path);
              if (onClose) onClose();
            }}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 3,

              "&.Mui-selected": {
                bgcolor: "#D32F2F",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },

              "&:hover": {
                bgcolor: "#D32F2F",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>

            <ListItemText primary={menu.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton
          sx={{
            mx: 1,
            mt: 1,
            borderRadius: 3,
            color: "error.main",
          }}
        >
          <ListItemIcon>
            <Logout color="error" />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}