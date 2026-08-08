import { supabase } from "../config/supabase";

/* ===========================
   GET SEMUA NASABAH
=========================== */

export async function getNasabah() {
  const { data, error } = await supabase
    .from("nasabah")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

/* ===========================
   GET NASABAH BERDASARKAN RUMAH
=========================== */

export async function getNasabahByRumah(rumahId) {
  const { data, error } = await supabase
    .from("nasabah")
    .select("*")
    .eq("rumah_id", rumahId)
    .eq("status", "Aktif")
    .order("nama", { ascending: true });

  if (error) throw error;

  return data;
}

/* ===========================
   CREATE
=========================== */

export async function createNasabah(payload) {
  const { data: kode, error: kodeError } =
    await supabase.rpc("generate_kode_nasabah");

  if (kodeError) throw kodeError;

  payload.kode = kode;

  const { data, error } = await supabase
    .from("nasabah")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}

/* ===========================
   UPDATE
=========================== */

export async function updateNasabah(id, payload) {
  const { data, error } = await supabase
    .from("nasabah")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

/* ===========================
   DELETE
=========================== */

export async function deleteNasabah(id) {
  const { error } = await supabase
    .from("nasabah")
    .delete()
    .eq("id", id);

  if (error) throw error;
}