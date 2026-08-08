import { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PaymentsIcon from "@mui/icons-material/Payments";
import RedeemIcon from "@mui/icons-material/Redeem";
import AssessmentIcon from "@mui/icons-material/Assessment";

import Chart from "react-apexcharts";

import { getRumah } from "../../services/rumahService";
import { getNasabah } from "../../services/nasabahService";
import { getJenisSampah } from "../../services/jenisSampahService";
import {
  getTotalSaldo,
  getGrafikSetoranBulanan,
  getTopJenisSampah,
} from "../../services/dashboardService";

export default function DashboardLaporan() {

  const [totalRumah, setTotalRumah] = useState(0);
  const [totalNasabah, setTotalNasabah] = useState(0);
  const [totalJenis, setTotalJenis] = useState(0);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [grafikData, setGrafikData] = useState([]);
  const [topJenis, setTopJenis] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const rumah = await getRumah();
      const nasabah = await getNasabah();
      const jenis = await getJenisSampah();
      const saldo = await getTotalSaldo();
      const grafik = await getGrafikSetoranBulanan();
      const top = await getTopJenisSampah();

      setTotalRumah(rumah.length);
      setTotalNasabah(nasabah.length);
      setTotalJenis(jenis.length);
      setTotalSaldo(saldo);
      setGrafikData(grafik);
      setTopJenis(top);

    } catch (err) {
      console.log(err);
    }
  }

  const cards = [
    {
      title: "Total Rumah",
      value: totalRumah,
      icon: <HomeIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Total Nasabah",
      value: totalNasabah,
      icon: <PeopleIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Jenis Sampah",
      value: totalJenis,
      icon: <RecyclingIcon fontSize="large" />,
      color: "#ed6c02",
    },
    {
      title: "Total Penarikan",
      value: "Rp 0",
      icon: <PaymentsIcon fontSize="large" />,
      color: "#9c27b0",
    },
    {
      title: "Reward Ditukar",
      value: 0,
      icon: <RedeemIcon fontSize="large" />,
      color: "#d32f2f",
    },
    {
      title: "Total Saldo",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(totalSaldo),
      icon: <AssessmentIcon fontSize="large" />,
      color: "#00897b",
    },
  ];

  return (
    <Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Dashboard Laporan
      </Typography>

      <Grid container spacing={3}>

        {cards.map((card) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={card.title}
          >

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
              }}
            >

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={1}
                  >
                    {card.value}
                  </Typography>

                </Box>

                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: card.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </Box>

              </Box>

            </Paper>

          </Grid>

        ))}

        {/* ================= GRAFIK ================= */}

        <Grid item xs={12} md={8}>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              height: 350,
            }}
          >

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Grafik Setoran Bulanan
            </Typography>
<Chart
  type="bar"
  height={250}
  series={[
    {
      name: "Total Setoran (Rp)",
      data: grafikData.map((item) => item.total),
    },
  ]}
  options={{
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: grafikData.map((item) => item.bulan),
    },
    colors: ["#2e7d32"],
    plotOptions: {
      bar: {
        borderRadius: 5,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) =>
          new Intl.NumberFormat("id-ID").format(value),
      },
    },
    tooltip: {
      y: {
        formatter: (value) =>
          "Rp " + new Intl.NumberFormat("id-ID").format(value),
      },
    },
  }}
/>

          </Paper>

        </Grid>

        {/* ================= TOP JENIS ================= */}

        <Grid item xs={12} md={4}>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              height: 350,
            }}
          >

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Top Jenis Sampah
            </Typography>

<Box sx={{ mt: 1 }}>
  {topJenis.length === 0 ? (
    <Typography color="text.secondary">
      Belum ada data setoran.
    </Typography>
  ) : (
    topJenis.map((item, index) => (
      <Box
        key={item.nama}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          borderBottom:
            index !== topJenis.length - 1
              ? "1px solid #eee"
              : "none",
        }}
      >
        <Typography>
          {index + 1}. {item.nama}
        </Typography>

        <Typography fontWeight="bold">
          {item.berat} Kg
        </Typography>
      </Box>
    ))
  )}
</Box>

          </Paper>

        </Grid>

      </Grid>

    </Box>
  );
}