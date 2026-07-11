import ReactApexChart from "react-apexcharts";

const ChartOne = ({ data }) => {
  const graph = {
    series: [
      {
        name: "sales",
        data: [...data?.map((val) => val?.sales?.toFixed())],
      },
      {
        name: "orders",
        data: [...data?.map((val) => val?.orders)],
      },
    ],
    options: {
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 350,
        type: "bar",
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },

        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: [...data?.map((val) => val?._id)],
      },
      //   tooltip: {
      //     x: {
      //       // format: "dd/MM/yy HH:mm",
      //     },
      //   },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={graph.options}
        series={graph.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartOne;
