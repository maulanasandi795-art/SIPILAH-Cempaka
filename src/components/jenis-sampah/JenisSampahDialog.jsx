import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";

import {
  createJenisSampah,
  updateJenisSampah,
} from "../../services/jenisSampahService";

const kategoriList = [
  "Plastik",
  "Kertas",
  "Logam",
  "Kaca",
  "Organik",
  "Minyak",
  "Elektronik",
  "B3",
  "Lainnya",
];

const satuanList = [
  "Kg",
  "Liter",
  "Buah",
  "Pcs",
  "Unit",
  "Karung",
];

export default function JenisSampahDialog({
  open,
  onClose,
  onSuccess,
  editData,
}) {
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    satuan: "Kg",
    harga: "",
    status: "Aktif",
    foto: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.foto || "");
    } else {
      setForm({
        nama: "",
        kategori: "",
        satuan: "Kg",
        harga: "",
        status: "Aktif",
        foto: null,
      });

      setPreview("");
    }
  }, [editData, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      foto: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (editData) {
        await updateJenisSampah(editData.id, form);
      } else {
        await createJenisSampah(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {editData ? "Edit Jenis Sampah" : "Tambah Jenis Sampah"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          <Grid size={12}>
            <Stack
              alignItems="center"
              spacing={2}
            >
              <Avatar
                src={preview}
                sx={{
                  width: 120,
                  height: 120,
                }}
              />

              <Button
                component="label"
                variant="outlined"
              >
                Upload Foto

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFoto}
                />
              </Button>
            </Stack>
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Nama Sampah"
              name="nama"
              value={form.nama}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              select
              label="Kategori"
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
            >
              {kategoriList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              select
              label="Satuan"
              name="satuan"
              value={form.satuan}
              onChange={handleChange}
            >
              {satuanList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              type="number"
              label="Harga"
              name="harga"
              value={form.harga}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Aktif">Aktif</MenuItem>
              <MenuItem value="Nonaktif">Nonaktif</MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
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