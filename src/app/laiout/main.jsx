import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
    // console.log("click", error);
  };
  return (
    <div className="container mt-5">
      <h2>Main</h2>
      <h3>Инициализация FireBase</h3>
      <ul>
        <li>Status: { status }</li>
        <li>Progress: { progress }%</li>
        { error && <li>Error: { error }</li> }
      </ul>
      <button className="btn btn-primary" onClick={ handleClick }>Инициализировать</button>
    </div>
  );
};

export default Main;
