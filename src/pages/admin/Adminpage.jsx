import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AdminTable from "./AdminTable";
import AdminDialog from "./AdminDialog";

import {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../services/adminService";

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getAdmin();
      setRows(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTambah = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setSelected(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Hapus admin ini?")) return;

    try {
      await deleteAdmin(row.id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async (form) => {
    try {
      if (selected) {
        await updateAdmin(selected.id, form);
      } else {
        await createAdmin(form);
      }

      setOpen(false);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredRows = rows.filter((item) => {
    return (
      item.nama?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.username?.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  return (
    <Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Master Admin
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleTambah}
        >
          Tambah Admin
        </Button>
      </Stack>

      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari nama atau username..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <AdminTable
          rows={filteredRows}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <AdminDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        data={selected}
      />

    </Box>
  );
}