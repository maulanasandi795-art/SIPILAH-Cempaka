import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function QRRumahDialog({
  open,
  onClose,
  data,
}) {
  if (!data) return null;

  const downloadPNG = async () => {
    const card = document.getElementById("kartuRumah");

    const canvas = await html2canvas(card, {
      scale: 3,
    });

    const link = document.createElement("a");

    link.download = `${data.kode}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  const downloadPDF = async () => {
    const card = document.getElementById("kartuRumah");

    const canvas = await html2canvas(card, {
      scale: 3,
    });

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");

    pdf.addImage(img, "PNG", 25, 20, 160, 95);

    pdf.save(`${data.kode}.pdf`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle align="center">
        QR Code Rumah
      </DialogTitle>

      <DialogContent>

        <Box
          id="kartuRumah"
          sx={{
            width: 360,
            mx: "auto",
            mt: 2,
            borderRadius: 4,
            overflow: "hidden",
            border: "2px solid #d32f2f",
            bgcolor: "#fff",
            boxShadow: 3,
          }}
        >

          <Box
            sx={{
              bgcolor: "#d32f2f",
              color: "#fff",
              textAlign: "center",
              py: 3,
            }}
          >

            <img
              src="/images/logo-sipilah.png"
              alt="Logo SIPILAH"
              style={{
                width: 80,
                marginBottom: 10,
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              SIPILAH
            </Typography>

            <Typography variant="body2">
              Kartu Rumah
            </Typography>

          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <QRCode
              value={data.kode}
              size={170}
            />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              p: 3,
              lineHeight: 2,
            }}
          >

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {data.nama}
            </Typography>

            <Typography>
              {data.kode}
            </Typography>

            <Typography>
              RW {data.rw} / RT {data.rt}
            </Typography>

            <Typography>
              Jumlah KK : {data.jumlah_kk}
            </Typography>

          </Box>

          <Box
            sx={{
              bgcolor: "#f5f5f5",
              py: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="caption">
              Scan QR ini untuk identitas rumah
            </Typography>
          </Box>

        </Box>

      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          pb: 3,
        }}
      >

        <Button
          variant="contained"
          onClick={downloadPNG}
        >
          Download PNG
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={downloadPDF}
        >
          Download PDF
        </Button>

        <Button
          color="error"
          onClick={onClose}
        >
          Tutup
        </Button>

      </DialogActions>

    </Dialog>
  );
}