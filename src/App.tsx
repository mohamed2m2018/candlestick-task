import "./App.css";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import useChartData from "./hooks/useChartData";
import { options } from "./helpers";
import IntervalInput from "./components/IntervalInput";

function App() {
  const {
    setFirstDate,
    setSecondDate,
    setInterval,
    series,
    oneYearAgo,
    handleReadRemoteFile,
  } = useChartData();
  const [value, onChange] = useState<Date[]>([oneYearAgo, new Date()]);

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInterval(event.target.value);
  };

  const handleDateChange = (input: Date[]) => {
    const [firstInput, secondinput] = input;
    setFirstDate(Math.ceil(firstInput.getTime() / 1000));
    setSecondDate(Math.ceil(secondinput.getTime() / 1000));
    onChange(input);
  };

  return (
    <div className="App">
      <h1>Candlestick Chart</h1>
      <div className="Upper-container">
        <span className="Title">Please Select Range</span>
        <span className="Date-range">
          <DateRangePicker
            minDate={new Date("2019-12-16")}
            onChange={handleDateChange}
            value={value}
          />
        </span>
        <IntervalInput
          handleIntervalChange={handleIntervalChange}
          handleReadRemoteFile={handleReadRemoteFile}
        />
      </div>
      {series && (
        <div className="ChartContainer">
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={450}
          />
        </div>
      )}
    </div>
  );
}

export default App;
