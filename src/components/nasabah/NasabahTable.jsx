import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Chip,
} from "@mui/material";

export default function NasabahTable({
  rows,
  loading,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "kode",
      headerName: "Kode",
      width: 120,
    },

    {
      field: "rumah",
      headerName: "Rumah",
      flex: 1,
      minWidth: 180,
      valueGetter: (_, row) => row.rumah?.nama || "-",
    },

    {
      field: "nama",
      headerName: "Nama Nasabah",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "nama_kk",
      headerName: "Kepala Keluarga",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "hp",
      headerName: "No HP",
      width: 150,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Aktif"
              ? "success"
              : "error"
          }
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
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEdit(row)}
        />,

        <GridActionsCellItem
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
      autoHeight
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      sx={{
        borderRadius: 3,

        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
        },
      }}
    />
  );
}