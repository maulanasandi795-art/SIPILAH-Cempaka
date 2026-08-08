import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";

import {
  getRumah,
} from "../../services/rumahService";

import {
  getNasabah,
} from "../../services/nasabahService";

import {
  getLaporanSetoran,
  getDetailSetoran,
  getTotalBeratSetoran,
} from "../../services/laporanService";

import { exportSetoranExcel } from "../../utils/exportExcel";
import { exportSetoranPDF } from "../../utils/exportPDF";

export default function LaporanSetoran() {

  /* ==========================
     STATE
  ========================== */

  const [rows, setRows] = useState([]);

  const [rumahList, setRumahList] =
    useState([]);

  const [nasabahList, setNasabahList] =
    useState([]);

  const [details, setDetails] =
    useState([]);

    const [selectedRow, setSelectedRow] = useState(null);

  const [openDetail, setOpenDetail] =
    useState(false);

    const [totalBerat, setTotalBerat] = useState(0);

  const [filter, setFilter] = useState({

    tanggalAwal: "",

    tanggalAkhir: "",

    rumah_id: "",

    nasabah_id: "",

  });

  /* ==========================
     LOAD
  ========================== */

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

  try {

    const laporan =
      await getLaporanSetoran();

    const rumah =
      await getRumah();

    const berat =
      await getTotalBeratSetoran();

    console.log("TOTAL BERAT =", berat);

    setTotalBerat(berat);

    const nasabah =
      await getNasabah();

    setRows(laporan);

    setRumahList(rumah);

    setNasabahList(nasabah);

  } catch (err) {

    console.log(err);

  }

}

  /* ==========================
     DETAIL
  ========================== */

async function handleDetail(row) {

  try {

    const data = await getDetailSetoran(row.id);

    setSelectedRow(row);

    setDetails(data);

    setOpenDetail(true);

  } catch (err) {

    console.log(err);

  }

}

  /* ==========================
     PRINT
  ========================== */

  function handlePrint() {
    window.print();
  }

  /* ==========================
     FILTER
  ========================== */

  const handleFilter = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFilter((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /* ==========================
     DATA FILTER
  ========================== */

  const filteredRows = useMemo(() => {

    return rows.filter((row) => {

      if (
        filter.rumah_id &&
        row.rumah_id !== filter.rumah_id
      )
        return false;

      if (
        filter.nasabah_id &&
        row.nasabah_id !== filter.nasabah_id
      )
        return false;

      if (
        filter.tanggalAwal &&
        row.tanggal < filter.tanggalAwal
      )
        return false;

      if (
        filter.tanggalAkhir &&
        row.tanggal > filter.tanggalAkhir
      )
        return false;

      return true;

    });

  }, [rows, filter]);

  /* ==========================
     SUMMARY
  ========================== */

  const totalNominal =
    filteredRows.reduce(

      (sum, item) =>

        sum + Number(item.total),

      0

    );

const totalBeratDetail =
  details.reduce(
    (sum, item) =>
      sum + Number(item.berat),
    0
  );
      return (
    <Box>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #print-area,
            #print-area * {
              visibility: visible;
            }

            #print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Laporan Setoran
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 3,
        }}
      >

        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Tanggal Awal"
              name="tanggalAwal"
              value={filter.tanggalAwal}
              onChange={handleFilter}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Tanggal Akhir"
              name="tanggalAkhir"
              value={filter.tanggalAkhir}
              onChange={handleFilter}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Rumah"
              name="rumah_id"
              value={filter.rumah_id}
              onChange={handleFilter}
            >

              <MenuItem value="">
                Semua Rumah
              </MenuItem>

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

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Nasabah"
              name="nasabah_id"
              value={filter.nasabah_id}
              onChange={handleFilter}
            >

              <MenuItem value="">
                Semua Nasabah
              </MenuItem>

              {nasabahList.map((item) => (

                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.nama}
                </MenuItem>

              ))}

            </TextField>
          </Grid>

        </Grid>

      </Paper>

      <Grid
        container
        spacing={2}
        mb={3}
      >

        <Grid item xs={12} md={4}>

          <Paper sx={{ p: 2 }}>

            <Typography color="text.secondary">
              Total Transaksi
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {filteredRows.length}
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={4}>

          <Paper sx={{ p: 2 }}>

            <Typography color="text.secondary">
              Total Berat
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {totalBerat} Kg
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={4}>

          <Paper sx={{ p: 2 }}>

            <Typography color="text.secondary">
              Total Nominal
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {new Intl.NumberFormat(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }
              ).format(totalNominal)}
            </Typography>

          </Paper>

        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
        }}
      >

        <Stack
  direction="row"
  spacing={2}
  justifyContent="flex-end"
  mb={2}
>
  <Button
    variant="contained"
    color="success"
    onClick={() => exportSetoranExcel(filteredRows)}
  >
    Export Excel
  </Button>

  <Button
    variant="contained"
    color="error"
    onClick={() => exportSetoranPDF(filteredRows)}
  >
    Export PDF
  </Button>
</Stack>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Kode</TableCell>

              <TableCell>Tanggal</TableCell>

              <TableCell>Rumah</TableCell>

              <TableCell>Nasabah</TableCell>

              <TableCell align="right">
                Total
              </TableCell>

              <TableCell align="center">
                Aksi
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredRows.map((row) => (

              <TableRow key={row.id}>

                <TableCell>
                  {row.kode}
                </TableCell>

                <TableCell>
                  {row.tanggal}
                </TableCell>

                <TableCell>
                  {row.rumah?.nama}
                </TableCell>

                <TableCell>
                  {row.nasabah?.nama}
                </TableCell>

                <TableCell align="right">

                  {new Intl.NumberFormat(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }
                  ).format(row.total)}

                </TableCell>

                <TableCell align="center">

<IconButton
  color="primary"
  onClick={() =>
    handleDetail(row)
  }
>
  <VisibilityIcon />
</IconButton>

                  <IconButton
                    color="success"
                    onClick={async () => {
                      await handleDetail(row);
                      setTimeout(() => window.print(), 300);
                    }}
                  >
                    <PrintIcon />
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>
            <Dialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Detail Setoran
        </DialogTitle>

<DialogContent>

  <div id="print-area">

    <Typography
      variant="h5"
      align="center"
      fontWeight="bold"
      gutterBottom
    >
      BUKTI SETORAN
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={1} mb={2}>

      <Grid item xs={6}>
        <Typography>
          <b>Kode :</b> {selectedRow?.kode}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          <b>Tanggal :</b> {selectedRow?.tanggal}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          <b>Rumah :</b> {selectedRow?.rumah?.nama}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          <b>Nasabah :</b> {selectedRow?.nasabah?.nama}
        </Typography>
      </Grid>

    </Grid>

    <Table size="small">

            <TableHead>

              <TableRow>

                <TableCell>No</TableCell>

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

              </TableRow>

            </TableHead>

            <TableBody>

              {details.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    Tidak ada data.
                  </TableCell>

                </TableRow>

              ) : (

                details.map((item, index) => (

                  <TableRow key={item.id}>

                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      {item.jenis_sampah?.nama}
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

                  </TableRow>

                ))

              )}

            </TableBody>

          </Table>

          <Divider sx={{ my: 3 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
          >

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Total Berat
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {details.reduce(
                (sum, item) =>
                  sum + Number(item.berat),
                0
              )} Kg
            </Typography>

          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            mt={2}
          >

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Total Nominal
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
            >
              {new Intl.NumberFormat(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }
              ).format(

                details.reduce(
                  (sum, item) =>
                    sum + Number(item.subtotal),
                  0
                )

              )}
            </Typography>

          </Stack>

  </div>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenDetail(false)
            }
          >
            Tutup
          </Button>

          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Cetak
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );

}