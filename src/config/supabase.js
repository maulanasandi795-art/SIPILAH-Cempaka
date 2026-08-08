import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ikbpivclyzexdrpqrlgw.supabase.co";

const supabaseKey =
  "sb_publishable_yd8Z0W9zcSCTXm_zgyhPIQ_bZamVUwb";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);