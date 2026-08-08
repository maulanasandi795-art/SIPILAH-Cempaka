import * as XLSX from "xlsx";

export function exportSetoranExcel(rows) {
  const data = rows.map((item, index) => ({
    No: index + 1,
    Kode: item.kode,
    Tanggal: item.tanggal,
    Rumah: item.rumah?.nama ?? "-",
    Nasabah: item.nasabah?.nama ?? "-",
    Total: item.total,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Laporan Setoran"
  );

  XLSX.writeFile(
    workbook,
    `Laporan_Setoran_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`
  );
}