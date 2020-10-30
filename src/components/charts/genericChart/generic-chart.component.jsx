import React, { useEffect, useState } from "react";
import Axios from "axios";
import Chart from "./chart";

const GenericChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getInformation = async () => {
      try {
        const { data } = await Axios.get("http://localhost:3300/provincia");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInformation();
  }, []);

  return <Chart data={data} />;
};

export default GenericChart;
