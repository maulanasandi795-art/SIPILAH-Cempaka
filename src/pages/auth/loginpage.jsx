import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

import { supabase } from "../../config/supabase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (loginError) {
      setError("Email atau password salah.");
      return;
    }

    navigate("/dashboard");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

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
        <Box
          component="img"
          src="/images/logo-sipilah.png"
          alt="SIPILAH Cempaka"
          sx={{
            width: 100,
            height: "auto",
            display: "block",
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          SIPILAH CEMPAKA
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
            textAlign: "center",
          }}
        >
          Selamat datang kembali.
        </Typography>

        <Stack spacing={2}>

          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>

        </Stack>
      </Card>
    </Box>
  );
}