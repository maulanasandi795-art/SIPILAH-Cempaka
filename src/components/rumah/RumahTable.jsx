import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCode2Icon from "@mui/icons-material/QrCode2";

export default function RumahTable({
  rows,
  loading,
  onEdit,
  onDelete,
  onQR,
}) {
  const columns = [
    {
      field: "kode",
      headerName: "Kode",
      width: 130,
    },
    {
      field: "nama",
      headerName: "Nama Rumah",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "rw",
      headerName: "RW",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "rt",
      headerName: "RT",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "jumlah_kk",
      headerName: "Jumlah KK",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "aksi",
      type: "actions",
      headerName: "Aksi",
      width: 100,
      
    
  getActions: ({ row }) => [

    <GridActionsCellItem
      icon={<QrCode2Icon color="primary" />}
      label="QR Code"
      onClick={() => onQR(row)}
    />,

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
  ]
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
      sx={{
        borderRadius: 3,
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
        },
      }}
    />
  );
}