import { useEffect, useState } from "react";
import { getNasabah } from "../services/nasabahService";

export default function useNasabah() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
  setLoading(true);

  try {
    const data = await getNasabah();

    console.log("DATA NASABAH:", data); // <-- tambahkan baris ini

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