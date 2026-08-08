import { supabase } from "../config/supabase";

/* ===========================
   TOTAL SALDO SETORAN
=========================== */

export async function getTotalSaldo() {
  const { data, error } = await supabase
    .from("transaksi_setoran")
    .select("total");

  if (error) throw error;

  const total = data.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  return total;
}

/* ===========================
   TOTAL BERAT SETORAN (Kg)
=========================== */

export async function getTotalBerat() {
  const { data, error } = await supabase
    .from("transaksi_setoran_detail")
    .select("berat");

  if (error) throw error;

  const total = data.reduce(
    (sum, item) => sum + Number(item.berat || 0),
    0
  );

  return total;
}

/* ===========================
   TOTAL TRANSAKSI SETORAN
=========================== */

export async function getTotalTransaksi() {
  const { count, error } = await supabase
    .from("transaksi_setoran")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count || 0;
}

/* ===========================
   DASHBOARD SUMMARY
=========================== */

export async function getDashboardSummary() {
  const [
    totalSaldo,
    totalBerat,
    totalTransaksi,
  ] = await Promise.all([
    getTotalSaldo(),
    getTotalBerat(),
    getTotalTransaksi(),
  ]);

  return {
    totalSaldo,
    totalBerat,
    totalTransaksi,
  };
}
/* ===========================
   GRAFIK SETORAN BULANAN
=========================== */

export async function getGrafikSetoranBulanan() {
  const { data, error } = await supabase
    .from("transaksi_setoran")
    .select("tanggal,total")
    .order("tanggal", { ascending: true });

  if (error) throw error;

  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const hasil = Array.from({ length: 12 }, (_, i) => ({
    bulan: bulan[i],
    total: 0,
  }));

  data.forEach((item) => {
    const index = new Date(item.tanggal).getMonth();
    hasil[index].total += Number(item.total || 0);
  });

  return hasil;
}
/* ===========================
   TOP JENIS SAMPAH
=========================== */

export async function getTopJenisSampah() {
  const { data, error } = await supabase
    .from("transaksi_setoran_detail")
    .select(`
      berat,
      jenis_sampah (
        nama
      )
    `);

  if (error) throw error;

  const hasil = {};

  data.forEach((item) => {
    const nama = item.jenis_sampah?.nama || "Lainnya";

    hasil[nama] =
      (hasil[nama] || 0) + Number(item.berat);
  });

  return Object.entries(hasil)
    .map(([nama, berat]) => ({
      nama,
      berat,
    }))
    .sort((a, b) => b.berat - a.berat)
    .slice(0, 5);
}