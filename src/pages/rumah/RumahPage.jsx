import { useState } from "react";

import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import useRumah from "../../hooks/useRumah";

import RumahTable from "../../components/rumah/RumahTable";
import RumahDialog from "../../components/rumah/RumahDialog";
import QRRumahDialog from "../../components/rumah/QRRumahDialog";

import DeleteDialog from "../../components/nasabah/DeleteDialog";

import { deleteRumah } from "../../services/rumahService";

export default function RumahPage() {
  const {
    rows,
    loading,
    loadData,
  } = useRumah();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

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
    setSelectedQR(row);
    setQrOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRumah(selectedData.id);

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
            Master Rumah
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleTambah}
          >
            Tambah Rumah
          </Button>
        </Stack>

        <RumahTable
          rows={rows}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onQR={handleQR}
        />
      </Paper>

      <RumahDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadData}
        editData={editData}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Rumah"
        message={`Yakin ingin menghapus rumah "${selectedData?.nama}" ?`}
      />

      <QRRumahDialog
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        data={selectedQR}
      />
    </Box>
  );
}