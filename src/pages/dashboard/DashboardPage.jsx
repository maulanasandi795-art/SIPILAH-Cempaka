import Grid from "@mui/material/Grid";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Stack,
  Button,
} from "@mui/material";

import {
  People,
  Home,
  Recycling,
  AccountBalanceWallet,
  TrendingUp,
  Add,
} from "@mui/icons-material";

const cards = [
  {
    title: "Total Nasabah",
    value: "1.254",
    color: "#1976D2",
    icon: <People />,
  },
  {
    title: "Total Rumah",
    value: "385",
    color: "#2E7D32",
    icon: <Home />,
  },
  {
    title: "Total Setoran",
    value: "12.450 Kg",
    color: "#ED6C02",
    icon: <Recycling />,
  },
  {
    title: "Saldo Bank Sampah",
    value: "Rp24,5 Jt",
    color: "#D32F2F",
    icon: <AccountBalanceWallet />,
  },
];

export default function DashboardPage() {
  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Selamat datang di SIPILAH Cempaka
      </Typography>

      <Grid container spacing={3}>

        {cards.map((item) => (

          <Grid
            xs={12}
            sm={6}
            lg={3}
            key={item.title}
          >

            <Paper
              elevation={0}
              sx={{
                p:3,
                borderRadius:5,
                border:"1px solid #ECECEC",
                transition:".3s",

                "&:hover":{
                  transform:"translateY(-6px)",
                  boxShadow:"0 15px 35px rgba(0,0,0,.08)"
                }
              }}
            >

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    mt={1}
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>

                  <Stack
                    mt={2}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <TrendingUp
                      sx={{
                        color:"#2E7D32",
                        fontSize:18
                      }}
                    />

                    <Typography
                      color="#2E7D32"
                      fontWeight={600}
                      fontSize={14}
                    >
                      +12%
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={13}
                    >
                      bulan ini
                    </Typography>

                  </Stack>

                </Box>

                <Avatar
                  sx={{
                    width:60,
                    height:60,
                    bgcolor:item.color,
                  }}
                >
                  {item.icon}
                </Avatar>

              </Stack>

            </Paper>

          </Grid>

        ))}

      </Grid>

      <Grid
        container
        spacing={3}
        mt={1}
      >

        <Grid
          xs={12}
          lg={8}
        >

          <Paper
            sx={{
              p:4,
              borderRadius:5,
              height:420,
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Grafik Setoran
            </Typography>

            <Box
              sx={{
                mt:3,
                height:300,
                borderRadius:4,
                bgcolor:"#F7F8FC",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
              }}
            >

              <Typography color="text.secondary">
                Area Chart ApexCharts
              </Typography>

            </Box>

          </Paper>

        </Grid>

        <Grid
          xs={12}
          lg={4}
        >

          <Paper
            sx={{
              p:4,
              borderRadius:5,
              height:420,
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Quick Action
            </Typography>

            <Stack
              spacing={2}
              mt={3}
            >

              <Button
                startIcon={<Add />}
                variant="contained"
                size="large"
              >
                Tambah Nasabah
              </Button>

              <Button
                startIcon={<Add />}
                variant="outlined"
                size="large"
              >
                Tambah Rumah
              </Button>

              <Button
                startIcon={<Add />}
                variant="outlined"
                size="large"
              >
                Input Setoran
              </Button>

              <Button
                startIcon={<Add />}
                variant="outlined"
                size="large"
              >
                Lihat Laporan
              </Button>

            </Stack>

          </Paper>

        </Grid>

      </Grid>

    </Box>
  );
}