import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  MenuItem,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import {
  ArrowBack,
  Add,
} from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import {
  getRumah,
} from "../../services/rumahService";

import {
  getNasabahByRumah,
} from "../../services/nasabahService";

import {
  createSetoran,
} from "../../services/setoranService";

import DetailSetoranDialog from "./DetailSetoranDialog";

export default function SetoranForm() {

  const navigate = useNavigate();

  /* ===========================
     MASTER DATA
  =========================== */

  const [rumahList, setRumahList] = useState([]);

  const [nasabahList, setNasabahList] =
    useState([]);

  /* ===========================
     DIALOG
  =========================== */

  const [detailOpen, setDetailOpen] =
    useState(true);

  /* ===========================
     DETAIL TRANSAKSI
  =========================== */

  const [details, setDetails] =
    useState([]);

  /* ===========================
     HEADER
  =========================== */

  const [form, setForm] = useState({

    tanggal: new Date()
      .toISOString()
      .substring(0, 10),

    rumah_id: "",

    nasabah_id: "",

    total: 0,

  });

  /* ===========================
     LOAD MASTER
  =========================== */

  useEffect(() => {

    loadMaster();

  }, []);

async function loadMaster() {
  try {

    const rumah = await getRumah();

    setRumahList(rumah);

    // Awalnya kosong, nanti diisi setelah Rumah dipilih
    setNasabahList([]);

  } catch (err) {
    console.log(err);
  }
}

  /* ===========================
     CHANGE
  =========================== */

const handleChange = async (e) => {

  const { name, value } = e.target;

  if (name === "rumah_id") {

    try {

      const data = await getNasabahByRumah(value);

      setNasabahList(data);

      setForm((prev) => ({
        ...prev,
        rumah_id: value,
        nasabah_id: "",
      }));

    } catch (err) {
      console.log(err);
    }

    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

};

  /* ===========================
     TAMBAH ITEM
  =========================== */

  const handleAddItem = (item) => {

    const newItems = [

      ...details,

      item,

    ];

    setDetails(newItems);

    const total =
      newItems.reduce(

        (sum, row) =>

          sum + Number(row.subtotal),

        0

      );

    setForm((prev) => ({

      ...prev,

      total,

    }));

    setDetailOpen(false);

  };

  /* ===========================
     HAPUS ITEM
  =========================== */

  const handleDeleteItem = (index) => {

    const newItems =
      details.filter(

        (_, i) =>

          i !== index

      );

    setDetails(newItems);

    const total =
      newItems.reduce(

        (sum, row) =>

          sum + Number(row.subtotal),

        0

      );

    setForm((prev) => ({

      ...prev,

      total,

    }));

  };

  /* ===========================
     SIMPAN
  =========================== */

  const handleSave = async () => {

    try {

      if (!form.rumah_id)
        return alert("Pilih Rumah.");

      if (!form.nasabah_id)
        return alert("Pilih Nasabah.");

      if (details.length === 0)
        return alert(
          "Belum ada item sampah."
        );

      await createSetoran(

        form,

        details

      );

      alert(
        "Transaksi berhasil disimpan."
      );

      navigate("/setoran");

    } catch (err) {

      console.log(err);

      alert(err.message);

    }

  };

  /* ===========================
     RETURN
  =========================== */

  return (
    <Box>

  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mb={3}
  >
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >

      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate("/setoran")}
      >
        Kembali
      </Button>

      <Typography
        variant="h4"
        fontWeight={700}
      >
        Transaksi Setoran
      </Typography>

    </Stack>

    <Button
      variant="contained"
      color="success"
      onClick={handleSave}
    >
      Simpan Transaksi
    </Button>

  </Stack>

  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
    }}
  >

    <Typography
      variant="h6"
      fontWeight={600}
      mb={3}
    >
      Informasi Transaksi
    </Typography>

    <Grid
      container
      spacing={2}
    >

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          type="date"
          label="Tanggal"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="Rumah"
          name="rumah_id"
          value={form.rumah_id}
          onChange={handleChange}
        >

          {rumahList.map((item) => (

            <MenuItem
              key={item.id}
              value={item.id}
            >
              {item.kode} - {item.nama}
            </MenuItem>

          ))}

        </TextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="Nasabah"
          name="nasabah_id"
          value={form.nasabah_id}
          onChange={handleChange}
        >

          {nasabahList.map((item) => (

            <MenuItem
              key={item.id}
              value={item.id}
            >
              {item.kode} - {item.nama}
            </MenuItem>

          ))}

        </TextField>
      </Grid>

    </Grid>

    <Divider
      sx={{
        my: 4,
      }}
    />

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >

      <Typography
        variant="h6"
        fontWeight={600}
      >
        Detail Sampah
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() =>
          setDetailOpen(true)
        }
      >
        Tambah Item
      </Button>

    </Stack>
    <Table size="small">

  <TableHead>

    <TableRow>

      <TableCell width={50}>No</TableCell>

      <TableCell>Jenis Sampah</TableCell>

      <TableCell align="right">
        Harga
      </TableCell>

      <TableCell align="right">
        Berat
      </TableCell>

      <TableCell align="right">
        Subtotal
      </TableCell>

      <TableCell align="center">
        Aksi
      </TableCell>

    </TableRow>

  </TableHead>

  <TableBody>

    {details.length === 0 ? (

      <TableRow>

        <TableCell
          colSpan={6}
          align="center"
        >
          Belum ada item sampah.
        </TableCell>

      </TableRow>

    ) : (

      details.map((item, index) => (

        <TableRow key={index}>

          <TableCell>
            {index + 1}
          </TableCell>

          <TableCell>
            {item.nama}
          </TableCell>

          <TableCell align="right">
            {new Intl.NumberFormat(
              "id-ID"
            ).format(item.harga)}
          </TableCell>

          <TableCell align="right">
            {item.berat} Kg
          </TableCell>

          <TableCell align="right">
            {new Intl.NumberFormat(
              "id-ID"
            ).format(item.subtotal)}
          </TableCell>

          <TableCell align="center">

            <IconButton
              color="error"
              onClick={() =>
                handleDeleteItem(index)
              }
            >
              <DeleteIcon />
            </IconButton>

          </TableCell>

        </TableRow>

      ))

    )}

  </TableBody>

</Table>

<Divider sx={{ my: 4 }} />

<Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
>

  <Typography
    variant="h5"
    fontWeight={700}
  >
    Grand Total
  </Typography>

  <Typography
    variant="h4"
    color="primary"
    fontWeight={700}
  >
    {new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }
    ).format(form.total)}
  </Typography>

</Stack>

<Stack
  direction="row"
  spacing={2}
  justifyContent="flex-end"
  mt={4}
>

  <Button
    color="inherit"
    onClick={() =>
      navigate("/setoran")
    }
  >
    Batal
  </Button>

  <Button
    variant="contained"
    color="success"
    onClick={handleSave}
  >
    Simpan
  </Button>

</Stack>

</Paper>

<DetailSetoranDialog
  open={detailOpen}
  onClose={() =>
    setDetailOpen(false)
  }
  onSave={handleAddItem}
/>

</Box>

  );
}