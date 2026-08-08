import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  Edit,
  Delete,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function SetoranTable({
  rows,
  loading,
  onDelete,
}) {

  const navigate = useNavigate();

  const columns = [

    {
      field: "kode",
      headerName: "Kode",
      width: 140,
    },

    {
      field: "tanggal",
      headerName: "Tanggal",
      width: 130,
    },

    {
      field: "rumah",
      headerName: "Rumah",
      flex: 1,
      valueGetter: (_, row) =>
        row.rumah?.nama || "-",
    },

    {
      field: "nasabah",
      headerName: "Nasabah",
      flex: 1,
      valueGetter: (_, row) =>
        row.nasabah?.nama || "-",
    },

    {
      field: "total",
      headerName: "Total",
      width: 170,

      valueFormatter: (value) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(value || 0),
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Aksi",
      width: 100,

      getActions: ({ row }) => [

        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() =>
            navigate(`/setoran/edit/${row.id}`)
          }
        />,

        <GridActionsCellItem
          icon={<Delete color="error" />}
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
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
    />
  );
}