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

import {
  createNasabah,
  updateNasabah,
} from "../../services/nasabahService";

import { getRumah } from "../../services/rumahService";

const initialForm = {
  rumah_id: "",
  nama: "",
  nama_kk: "",
  hp: "",
  status: "Aktif",
};

export default function NasabahDialog({
  open,
  onClose,
  onSuccess,
  editData,
}) {
  const [form, setForm] = useState(initialForm);

  const [rumahList, setRumahList] = useState([]);

  useEffect(() => {
    loadRumah();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        rumah_id: editData.rumah_id || "",
        nama: editData.nama || "",
        nama_kk: editData.nama_kk || "",
        hp: editData.hp || "",
        status: editData.status || "Aktif",
      });
    } else {
      setForm(initialForm);
    }
  }, [editData, open]);

  const loadRumah = async () => {
    try {
      const data = await getRumah();
      setRumahList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editData) {
        await updateNasabah(editData.id, form);
      } else {
        await createNasabah(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {editData ? "Edit Nasabah" : "Tambah Nasabah"}
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid item xs={12}>

            <TextField
              select
              fullWidth
              name="rumah_id"
              label="Rumah"
              value={form.rumah_id}
              onChange={handleChange}
            >
              {rumahList.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.nama}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              name="nama"
              label="Nama Lengkap"
              value={form.nama}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              name="nama_kk"
              label="Nama Kepala Keluarga"
              value={form.nama_kk}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              name="hp"
              label="Nomor HP"
              value={form.hp}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Aktif">
                Aktif
              </MenuItem>

              <MenuItem value="Non Aktif">
                Non Aktif
              </MenuItem>

            </TextField>

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions sx={{ p: 2 }}>

        <Button
          color="inherit"
          onClick={onClose}
        >
          Batal
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Simpan
        </Button>

      </DialogActions>

    </Dialog>
  );
}