import { useState } from "react";

import {
  Box,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import useJenisSampah from "../../hooks/useJenisSampah";
import JenisSampahTable from "../../components/jenis-sampah/JenisSampahTable";
import JenisSampahDialog from "../../components/jenis-sampah/JenisSampahDialog";

import {
  deleteJenisSampah,
} from "../../services/jenisSampahService";

export default function JenisSampahPage() {

  const {
    rows,
    loading,
    loadData,
  } = useJenisSampah();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleTambah = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {

    const ok = window.confirm(
      `Hapus ${row.nama}?`
    );

    if (!ok) return;

    try {

      await deleteJenisSampah(row.id);

      loadData();

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Master Jenis Sampah
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleTambah}
          >
            Tambah Jenis Sampah
          </Button>

        </Box>

        <JenisSampahTable
          rows={rows}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </Paper>

      <JenisSampahDialog
        open={open}
        editData={editData}
        onClose={() => setOpen(false)}
        onSuccess={loadData}
      />

    </Box>
  );
}