import { supabase } from "../config/supabase";

export async function getJenisSampah() {
  const { data, error } = await supabase
    .from("jenis_sampah")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createJenisSampah(payload) {
  // Generate kode otomatis
  const { data: kode, error: kodeError } = await supabase.rpc(
    "generate_kode_sampah"
  );

  if (kodeError) throw kodeError;

  payload.kode = kode;

  // Upload foto jika ada
  if (payload.foto instanceof File) {
    const fileName = `${Date.now()}-${payload.foto.name}`;

const { error: uploadError } = await supabase.storage
  .from("jenis-sampah")
  .upload(fileName, payload.foto);

if (uploadError) {
  console.log(uploadError);
  throw uploadError;
}

    const { data } = supabase.storage
      .from("jenis-sampah")
      .getPublicUrl(fileName);

    payload.foto = data.publicUrl;
  }

  const { data, error } = await supabase
    .from("jenis_sampah")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}

export async function updateJenisSampah(id, payload) {
  if (payload.foto instanceof File) {
    const fileName = `${Date.now()}-${payload.foto.name}`;

    const { error: uploadError } = await supabase.storage
      .from("jenis-sampah")
      .upload(fileName, payload.foto);

    if (uploadError) {
      console.log(uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("jenis-sampah")
      .getPublicUrl(fileName);

    payload.foto = data.publicUrl;
  }

  const { data, error } = await supabase
    .from("jenis_sampah")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteJenisSampah(id) {
  const { error } = await supabase
    .from("jenis_sampah")
    .delete()
    .eq("id", id);

  if (error) throw error;
}