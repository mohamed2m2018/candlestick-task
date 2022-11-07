import { ApexOptions } from "apexcharts";

export const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 550,
    },
    title: {
      text: "SP Funds S&P 500 Sharia Industry Exclusions ETF",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
