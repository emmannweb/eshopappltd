import ReactApexChart from "react-apexcharts";

const ChartTwo = ({ data }) => {
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
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        type: "datetime",
        categories: [...data?.map((val) => val?._id)],
      },
      //   yaxis: {
      //     title: {
      //       text: "$ (thousands)",
      //     },
      //   },
      fill: {
        opacity: 1,
      },
      //   tooltip: {
      //     y: {
      //       formatter: function (val) {
      //         return "$ " + val + " thousands";
      //       },
      //     },
      //   },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={graph.options}
        series={graph.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ChartTwo;
