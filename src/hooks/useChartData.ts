import { baseUrl } from "./../endpoints/baseUrl";
import { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
import { IYahooFinanceResponse } from "../types/YahooFinanceResponse";
import { Series } from "../types/ChartInput";

var oneYearAgo = new Date();
oneYearAgo.setDate(oneYearAgo.getDate() - 365);

const useChartData = () => {
  const [series, setSeries] = useState<Series[]>();

  const [firstDate, setFirstDate] = useState(
    Math.ceil(oneYearAgo?.getTime() / 1000)
  );
  const [secondDate, setSecondDate] = useState(
    Math.ceil(new Date().getTime() / 1000)
  );
  const [interval, setInterval] = useState<string>("1d");
  const [isLoading, setIsLoading] = useState(true);

  const handleReadRemoteFile = (url: string) => {
    readRemoteFile(url, {
      complete: (results: IYahooFinanceResponse) => {
        setIsLoading(false);
        const [, ...data] = results.data;
        const s = data.map((element) => {
          return {
            x: new Date(element[0]),
            y: element.slice(1, 5),
          };
        });
        setSeries([
          {
            data: s,
          },
        ]);
      },
      error: () => {
        setIsLoading(false);
        alert("Please make sure that the second date is after first date");
      },
      download: true,
    });
  };

  useEffect(() => {
    handleReadRemoteFile(
      `${baseUrl}?period1=${firstDate}&period2=${secondDate}&interval=${interval}&events=history&crumb=5YTX%2FgVGBmg`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    series,
    interval,
    setInterval,
    setFirstDate,
    setSecondDate,
    isLoading,
    oneYearAgo,
    handleReadRemoteFile: () => {
      setIsLoading(true);
      handleReadRemoteFile(
        `${baseUrl}?period1=${firstDate}&period2=${secondDate}&interval=${interval}&events=history&crumb=5YTX%2FgVGBmg`
      );
    },
  };
};

export default useChartData;
