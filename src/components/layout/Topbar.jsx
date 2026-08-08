import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";

import {
  Menu as MenuIcon,
  NotificationsNone,
  AccountCircle,
  People,
  Settings,
  Logout,
} from "@mui/icons-material";

export default function Topbar({
  drawerWidth,
  onMenuClick,
}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#222",
          borderBottom: "1px solid #ECECEC",
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            md: `${drawerWidth}px`,
          },
        }}
      >
        <Toolbar>

          {/* Menu Mobile */}

          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Judul */}

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              SIPILAH
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Sistem Pengelolaan Sampah Digital
            </Typography>
          </Box>

          {/* Notifikasi */}

          <Tooltip title="Notifikasi">
            <IconButton>
              <Badge
                badgeContent={4}
                color="error"
              >
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              gap: 1.5,
            }}
          >
            <IconButton
              onClick={handleOpenMenu}
              sx={{ p: 0 }}
            >
              <Avatar
                sx={{
                  bgcolor: "#D32F2F",
                  width: 40,
                  height: 40,
                }}
              >
                A
              </Avatar>
            </IconButton>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Typography fontWeight={600}>
                Administrator
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Super Admin
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dropdown User */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/admin");
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <People fontSize="small" />
          </ListItemIcon>
          Master Admin
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Pengaturan
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            // TODO: Logout
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}