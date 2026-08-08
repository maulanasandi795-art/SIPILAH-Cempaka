import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminTable({
  rows,
  loading,
  onEdit,
  onDelete,
}) {

  const columns = [
    {
      field: "nama",
      headerName: "Nama",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "username",
      headerName: "Username",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "no_hp",
      headerName: "No HP",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <span
          style={{
            background:
              value === "Aktif"
                ? "#E8F5E9"
                : "#FFEBEE",
            color:
              value === "Aktif"
                ? "#2E7D32"
                : "#C62828",
            padding: "4px 10px",
            borderRadius: 20,
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          {value}
        </span>
      ),
    },
    {
      field: "aksi",
      type: "actions",
      headerName: "Aksi",
      width: 100,

      getActions: ({ row }) => [

        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
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