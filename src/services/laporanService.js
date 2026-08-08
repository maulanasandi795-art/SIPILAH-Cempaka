import { supabase } from "../config/supabase";

/* ===================================
   LAPORAN SETORAN
=================================== */

export async function getLaporanSetoran() {
  const { data, error } = await supabase
    .from("transaksi_setoran")
    .select(`
      *,
      rumah(
        id,
        kode,
        nama
      ),
      nasabah(
        id,
        kode,
        nama
      )
    `)
    .order("tanggal", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/* ===================================
   DETAIL SETORAN
=================================== */

export async function getDetailSetoran(id) {
  const { data, error } = await supabase
    .from("transaksi_setoran_detail")
    .select(`
      *,
      jenis_sampah(
        nama
      )
    `)
    .eq("setoran_id", id);

  if (error) throw error;

  return data;
}

/* ===================================
   TOTAL BERAT SETORAN
=================================== */

export async function getTotalBeratSetoran() {
  const { data, error } = await supabase
    .from("transaksi_setoran_detail")
    .select("berat");

  if (error) throw error;

  return data.reduce(
    (sum, item) => sum + Number(item.berat),
    0
  );
}