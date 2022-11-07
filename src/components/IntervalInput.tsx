import React from "react";
import "./Interval.css";


type Props = {
  handleIntervalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleReadRemoteFile: () => void;
};

function IntervalInput({ handleIntervalChange, handleReadRemoteFile }: Props) {
  return (
    <>
      <span className="Title">Interval: </span>
      <select className="Select" onChange={handleIntervalChange}>
        <option value="1d">Daily</option>
        <option value="1wk">Weekly</option>
        <option value="1mo">Monthly</option>
      </select>
      <button className="Button" onClick={handleReadRemoteFile}>
        Fetch data
      </button>
    </>
  );
}

export default IntervalInput;
