import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  Avatar,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function JenisSampahTable({
  rows,
  loading,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "foto",
      headerName: "Foto",
      width: 90,
      sortable: false,
      renderCell: ({ value }) => (
        <Avatar
          src={value}
          variant="rounded"
          sx={{
            width: 55,
            height: 55,
            mt: 0.5,
          }}
        />
      ),
    },

    {
      field: "kode",
      headerName: "Kode",
      width: 120,
    },

    {
      field: "nama",
      headerName: "Nama Sampah",
      flex: 1,
      minWidth: 220,
    },

    {
      field: "kategori",
      headerName: "Kategori",
      width: 130,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color="primary"
          size="small"
        />
      ),
    },

    {
      field: "satuan",
      headerName: "Satuan",
      width: 90,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "harga",
      headerName: "Harga",
      width: 150,
      renderCell: ({ value }) => (
        <strong>{rupiah.format(value)}</strong>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={value === "Aktif" ? "success" : "default"}
          size="small"
        />
      ),
    },

    {
      field: "aksi",
      type: "actions",
      headerName: "Aksi",
      width: 90,

      getActions: ({ row }) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon color="primary" />}
          label="Edit"
          onClick={() => onEdit(row)}
        />,

        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => onDelete(row)}
        />,
      ],
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      getRowId={(row) => row.id}
      autoHeight
      pageSizeOptions={[10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      disableRowSelectionOnClick
      rowHeight={70}
      sx={{
        borderRadius: 3,

        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
        },
      }}
    />
  );
}