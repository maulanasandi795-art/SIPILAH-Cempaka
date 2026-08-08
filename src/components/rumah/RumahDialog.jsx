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
  createRumah,
  updateRumah,
} from "../../services/rumahService";

import useWilayah from "../../hooks/useWilayah";

const initialForm = {
  nama: "",
  rw: "",
  rt: "",
  alamat: "",
  jumlah_kk: 1,
};

export default function RumahDialog({
  open,
  onClose,
  onSuccess,
  editData,
}) {

  const [form, setForm] = useState(initialForm);

  const {
    rwList,
    rtList,
    loadRT,
  } = useWilayah();

  useEffect(() => {
    if (editData) {
      setForm(editData);

      if (editData.rw) {
        loadRT(editData.rw);
      }
    } else {
      setForm(initialForm);
    }
  }, [editData, open]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "rw") {

      await loadRT(value);

      setForm((prev) => ({
        ...prev,
        rw: value,
        rt: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {

      if (editData) {
        await updateRumah(editData.id, form);
      } else {
        await createRumah(form);
      }

      if (onSuccess) {
        await onSuccess();
      }

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
        {editData ? "Edit Rumah" : "Tambah Rumah"}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs:12, md:6 }}>
            <TextField
              fullWidth
              name="nama"
              label="Nama Rumah"
              value={form.nama}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs:12, md:3 }}>
            <TextField
              select
              fullWidth
              name="rw"
              label="RW"
              value={form.rw}
              onChange={handleChange}
            >
              {rwList.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.kode}
                >
                  {item.nama}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs:12, md:3 }}>
            <TextField
              select
              fullWidth
              name="rt"
              label="RT"
              value={form.rt}
              onChange={handleChange}
            >
              {rtList.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.kode}
                >
                  {item.nama}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs:12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="alamat"
              label="Alamat"
              value={form.alamat}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs:12, md:4 }}>
            <TextField
              fullWidth
              type="number"
              name="jumlah_kk"
              label="Jumlah KK"
              value={form.jumlah_kk}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions sx={{ p:2 }}>

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