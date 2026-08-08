import { useState } from "react";
import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const drawerWidth = 260;

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      <Topbar
        drawerWidth={drawerWidth}
        onMenuClick={handleDrawerToggle}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}