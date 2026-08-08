import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";

export default function AdminDialog({
  open,
  onClose,
  onSave,
  data,
}) {
  const [form, setForm] = useState({
    nama: "",
    username: "",
    password: "",
    email: "",
    no_hp: "",
    role: "Admin",
    status: "Aktif",
  });

  useEffect(() => {
    if (data) {
      setForm({
        nama: data.nama || "",
        username: data.username || "",
        password: data.password || "",
        email: data.email || "",
        no_hp: data.no_hp || "",
        role: data.role || "Admin",
        status: data.status || "Aktif",
      });
    } else {
      setForm({
        nama: "",
        username: "",
        password: "",
        email: "",
        no_hp: "",
        role: "Admin",
        status: "Aktif",
      });
    }
  }, [data, open]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {data ? "Edit Admin" : "Tambah Admin"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={0.5}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              name="nama"
              value={form.nama}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="No HP"
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <MenuItem value="Super Admin">
                Super Admin
              </MenuItem>

              <MenuItem value="Admin">
                Admin
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Aktif">
                Aktif
              </MenuItem>

              <MenuItem value="Nonaktif">
                Nonaktif
              </MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          color="error"
          onClick={onClose}
        >
          Batal
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}