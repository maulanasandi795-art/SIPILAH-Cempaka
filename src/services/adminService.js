import { supabase } from "../config/supabase";

export async function getAdmin() {
  const { data, error } = await supabase
    .from("admin")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createAdmin(payload) {
  const { data, error } = await supabase
    .from("admin")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}

export async function updateAdmin(id, payload) {
  const { data, error } = await supabase
    .from("admin")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteAdmin(id) {
  const { error } = await supabase
    .from("admin")
    .delete()
    .eq("id", id);

  if (error) throw error;
}