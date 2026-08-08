import Chart from "react-apexcharts";

export default function GrafikSetoran({ data }) {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: data.map((d) => d.bulan),
    },

    stroke: {
      curve: "smooth",
    },

    dataLabels: {
      enabled: false,
    },

    colors: ["#2E7D32"],

    yaxis: {
      labels: {
        formatter(value) {
          return "Rp " + value.toLocaleString("id-ID");
        },
      },
    },
  };

  const series = [
    {
      name: "Setoran",
      data: data.map((d) => d.total),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={280}
    />
  );
}