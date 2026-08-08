import { supabase } from "../config/supabase";

/* ===========================
   LIST SETORAN
=========================== */

export async function getSetoran() {
  const { data, error } = await supabase
    .from("transaksi_setoran")
    .select(`
      *,
      rumah (
        id,
        kode,
        nama
      ),
      nasabah (
        id,
        kode,
        nama
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/* ===========================
   DETAIL SETORAN
=========================== */

export async function getDetailSetoran(id) {
  const { data, error } = await supabase
    .from("transaksi_setoran_detail")
    .select(`
      *,
      jenis_sampah (
        id,
        kode,
        nama,
        harga
      )
    `)
    .eq("setoran_id", id);

  if (error) throw error;

  return data;
}

/* ===========================
   CREATE SETORAN
=========================== */

export async function createSetoran(header, details) {
  // Generate kode transaksi
  const { data: kode, error: kodeError } =
    await supabase.rpc("generate_kode_setoran");

  if (kodeError) throw kodeError;

  header.kode = kode;

  // Simpan Header
  const { data: transaksi, error: transaksiError } =
    await supabase
      .from("transaksi_setoran")
      .insert([header])
      .select()
      .single();

  if (transaksiError) throw transaksiError;

  // Siapkan Detail
  const items = details.map((item) => ({
    setoran_id: transaksi.id,
    jenis_sampah_id: item.jenis_sampah_id,
    berat: item.berat,
    harga: item.harga,
    subtotal: item.subtotal,
  }));

  // Simpan Detail
  const { error: detailError } = await supabase
    .from("transaksi_setoran_detail")
    .insert(items);

  if (detailError) throw detailError;

  return transaksi;
}

/* ===========================
   UPDATE SETORAN
=========================== */

export async function updateSetoran(id, header) {
  const { data, error } = await supabase
    .from("transaksi_setoran")
    .update(header)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   DELETE SETORAN
=========================== */

export async function deleteSetoran(id) {
  const { error } = await supabase
    .from("transaksi_setoran")
    .delete()
    .eq("id", id);

  if (error) throw error;
}