import { useState } from "react";

import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import useNasabah from "../../hooks/useNasabah";

import NasabahDialog from "../../components/nasabah/NasabahDialog";
import NasabahTable from "../../components/nasabah/NasabahTable";
import DeleteDialog from "../../components/nasabah/DeleteDialog";
import QRDialog from "../../components/nasabah/QRDialog";

import {
  deleteNasabah,
} from "../../services/nasabahService";

export default function NasabahPage() {

  const {
    rows,
    loading,
    loadData,
  } = useNasabah();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleTambah = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedData(row);
    setDeleteOpen(true);
  };

  const handleQR = (row) => {
    setQrData(row);
    setQrOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {

      await deleteNasabah(selectedData.id);

      setDeleteOpen(false);
      setSelectedData(null);

      await loadData();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Master Nasabah
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleTambah}
          >
            Tambah Nasabah
          </Button>

        </Stack>

        <NasabahTable
          rows={rows}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onQR={handleQR}
        />

      </Paper>

      <NasabahDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadData}
        editData={editData}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        data={selectedData}
      />

      <QRDialog
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        data={qrData}
      />

    </Box>
  );
}