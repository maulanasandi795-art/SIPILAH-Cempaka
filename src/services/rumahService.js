import { supabase } from "../config/supabase";

export async function getRumah() {
  const { data, error } = await supabase
    .from("rumah")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createRumah(payload) {
  // Generate kode otomatis
  const { data: kode, error: kodeError } =
    await supabase.rpc("generate_kode_rumah");

  if (kodeError) throw kodeError;

  payload.kode = kode;

  const { data, error } = await supabase
    .from("rumah")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}

export async function updateRumah(id, payload) {
  const { data, error } = await supabase
    .from("rumah")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteRumah(id) {
  const { error } = await supabase
    .from("rumah")
    .delete()
    .eq("id", id);

  if (error) throw error;
}