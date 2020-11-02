/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import * as log from 'loglevel';
import Chart from './chart';

const GenericChart = () => {
  const [dataToChart, setDataToChart] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get('http://localhost:3300/provincia');
      setDataToChart(data);
    } catch (error) {
      log('fetch provinces error', error);
    } finally {
      setLoading(false);
    }
  };

  return <Chart data={dataToChart} loading={loading} />;
};

export default GenericChart;
