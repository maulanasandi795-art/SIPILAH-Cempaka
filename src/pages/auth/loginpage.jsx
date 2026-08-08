import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Cempaka Smart Waste
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
          }}
        >
          Selamat datang kembali.
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
          />

          <TextField
            label="Password"
            type="password"
          />

          <Button
            variant="contained"
            size="large"
          >
            Masuk
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}