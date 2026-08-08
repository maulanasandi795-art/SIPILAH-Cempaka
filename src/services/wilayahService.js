import { supabase } from "../config/supabase";

export async function getRW() {
  const result = await supabase
    .from("wilayah_rw")
    .select("*")
    .order("kode");

  console.log("RESULT QUERY RW:", result);

  if (result.error) throw result.error;

  return result.data;
}

export async function getRT(rwKode) {
  const result = await supabase
    .from("wilayah_rt")
    .select("*")
    .eq("rw_kode", rwKode)
    .order("kode");

  console.log("RESULT QUERY RT:", result);

  if (result.error) throw result.error;

  return result.data;
}