import { useEffect, useState } from "react";
import { getRW, getRT } from "../services/wilayahService";

export default function useWilayah() {
  const [rwList, setRwList] = useState([]);
  const [rtList, setRtList] = useState([]);

  useEffect(() => {
    loadRW();
  }, []);

  const loadRW = async () => {
    try {
      const data = await getRW();

      console.log("DATA RW DARI SUPABASE:", data);

      setRwList(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRT = async (rwKode) => {
    try {
      const data = await getRT(rwKode);

      console.log("DATA RT DARI SUPABASE:", data);

      setRtList(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    rwList,
    rtList,
    loadRT,
  };
}