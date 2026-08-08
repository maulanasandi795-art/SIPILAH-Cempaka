import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#D32F2F",
    },

    secondary: {
      main: "#1976D2",
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: "#ED6C02",
    },

    error: {
      main: "#D32F2F",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 48,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
});

export default theme;