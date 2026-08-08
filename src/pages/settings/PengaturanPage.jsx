import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

export default function PengaturanPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Pengaturan
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3, maxWidth: 500 }}>

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Informasi Bank Sampah
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nama Bank Sampah"
            defaultValue="SIPILAH Cempaka"
            fullWidth
          />

          <TextField
            label="Alamat"
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            label="No. Telepon"
            fullWidth
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Button variant="contained">
          Simpan Perubahan
        </Button>

      </Paper>
    </Box>
  );
}