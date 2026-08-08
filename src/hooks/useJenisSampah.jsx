import { useEffect, useState } from "react";
import { getJenisSampah } from "../services/jenisSampahService";

export default function useJenisSampah() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getJenisSampah();
      setRows(data || []);
    } catch (error) {
      console.error(error);
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