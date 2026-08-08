import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  data,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Hapus Nasabah
      </DialogTitle>

      <DialogContent>
        <Typography>
          Apakah Anda yakin ingin menghapus nasabah berikut?
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {data?.nama}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Batal
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}