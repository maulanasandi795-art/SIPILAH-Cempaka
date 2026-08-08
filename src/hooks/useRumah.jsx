import { useEffect, useState } from "react";
import { getRumah } from "../services/rumahService";

export default function useRumah() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getRumah();

      setRows(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    rows,
    loading,
    loadData,
  };
}