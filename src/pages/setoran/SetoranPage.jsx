import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import {
  getSetoran,
  deleteSetoran,
} from "../../services/setoranService";

import SetoranTable from "./SetoranTable";

export default function SetoranPage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getSetoran();
      setRows(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (row) => {
    if (!window.confirm("Hapus transaksi ini?")) return;

    await deleteSetoran(row.id);
    loadData();
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" fontWeight={700}>
          Transaksi Setoran
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/setoran/new")}
        >
          Tambah Setoran
        </Button>
      </Stack>

      <Paper sx={{ p: 2 }}>
        <SetoranTable
          rows={rows}
          loading={loading}
          onDelete={handleDelete}
        />
      </Paper>
    </Box>
  );
}