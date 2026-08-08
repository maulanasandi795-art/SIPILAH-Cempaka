import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export default function KartuNasabah({ data }) {
  if (!data) return null;

  return (
    <Box
      id="kartu-nasabah"
      sx={{
        width: 340,
        background: "#fff",
        borderRadius: 4,
        overflow: "hidden",
        border: "2px solid #d32f2f",
        fontFamily: "Poppins",
      }}
    >
      <Box
        sx={{
          bgcolor: "#d32f2f",
          color: "#fff",
          textAlign: "center",
          py: 2,
        }}
      >
        <img
          src="/images/logo-sipilah.png"
          alt="logo"
          style={{
            width: 70,
            marginBottom: 8,
          }}
        />

        <Typography fontWeight="bold" fontSize={20}>
          SIPILAH
        </Typography>

        <Typography fontSize={12}>
          Sistem Pengelolaan Sampah Digital
        </Typography>
      </Box>

      <Box sx={{ p: 3, textAlign: "center" }}>
        <QRCode
          value={data.id}
          size={150}
        />

        <Typography
          mt={2}
          fontWeight={700}
          fontSize={20}
        >
          {data.nama}
        </Typography>

        <Typography>
          {data.kode}
        </Typography>

        <Typography mt={1}>
          RW {data.rw} / RT {data.rt}
        </Typography>

        <Typography>
          {data.hp}
        </Typography>
      </Box>
    </Box>
  );
}