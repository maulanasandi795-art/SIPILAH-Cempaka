import { useEffect } from "react";
import { supabase } from "./config/supabase";

export default function TestSupabase() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("nasabah")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return <h2>Supabase Connected</h2>;
}