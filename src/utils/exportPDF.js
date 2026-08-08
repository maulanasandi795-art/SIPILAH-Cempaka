import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportSetoranPDF(rows) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("LAPORAN SETORAN", 14, 18);

  doc.setFontSize(10);
  doc.text(
    `Tanggal Cetak : ${new Date().toLocaleDateString("id-ID")}`,
    14,
    26
  );

  const tableData = rows.map((item, index) => [
    index + 1,
    item.kode,
    item.tanggal,
    item.rumah?.nama ?? "-",
    item.nasabah?.nama ?? "-",
    new Intl.NumberFormat("id-ID").format(item.total),
  ]);

  autoTable(doc, {
    startY: 35,
    head: [[
      "No",
      "Kode",
      "Tanggal",
      "Rumah",
      "Nasabah",
      "Total"
    ]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [46, 125, 50],
    },
    styles: {
      fontSize: 9,
    },
  });

  doc.save(
    `Laporan_Setoran_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`
  );
}