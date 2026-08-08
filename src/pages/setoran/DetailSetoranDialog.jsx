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
} from "@mui/material";

import { getJenisSampah } from "../../services/jenisSampahService";

export default function DetailSetoranDialog({
  open,
  onClose,
  onSave,
}) {
  const [jenisList, setJenisList] = useState([]);

  const initialForm = {
    jenis_sampah_id: "",
    harga: 0,
    berat: "",
    subtotal: 0,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      loadJenis();
      setForm(initialForm);
    }
  }, [open]);

  async function loadJenis() {
    try {
      const data = await getJenisSampah();
      setJenisList(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleJenis = (e) => {
    const id = e.target.value;

    const item = jenisList.find((x) => x.id === id);

    setForm({
      jenis_sampah_id: id,
      harga: item?.harga || 0,
      berat: "",
      subtotal: 0,
    });
  };

  const handleBerat = (e) => {
    const berat = Number(e.target.value);

    setForm((prev) => ({
      ...prev,
      berat,
      subtotal: berat * prev.harga,
    }));
  };

  const handleTambah = () => {
    const jenis = jenisList.find(
      (x) => x.id === form.jenis_sampah_id
    );

    onSave({
      ...form,
      nama: jenis.nama,
    });

    setForm(initialForm);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Tambah Item Sampah
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} mt={1}>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Jenis Sampah"
              value={form.jenis_sampah_id}
              onChange={handleJenis}
            >
              {jenisList.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.nama}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Harga"
              value={form.harga}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Berat (Kg)"
              value={form.berat}
              onChange={handleBerat}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subtotal"
              value={new Intl.NumberFormat(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                }
              ).format(form.subtotal)}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Batal
        </Button>

        <Button
          variant="contained"
          onClick={handleTambah}
        >
          Tambah
        </Button>

      </DialogActions>

    </Dialog>
  );
}