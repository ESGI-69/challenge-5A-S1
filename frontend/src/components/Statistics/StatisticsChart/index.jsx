import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

export default function StatisticsChart({ data }) {
  const [ formattedData, setFormattedData ] = useState([]);
  const [ options, setOptions ] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    colors: [ '#fff' ],
    stroke: {
      width: 4,
      curve: 'smooth',
      colors: [ '#fff' ],
      opacity: 1,
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: formattedData.map(({ date }) => date),
      tickAmount: 12,
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#fff',
        },
        formatter: (value, timestamp, opts) => opts.dateFormatter(new Date(timestamp), 'MMM'),
      },
    },
  });
  const [ series, setSeries ] = useState([
    {
      name: 'Total',
      data: formattedData.map(({ sum }) => sum),
    },
  ]);

  useEffect(() => {
    if (data) {
      const formatted = Object.keys(data)?.map((key) => ({
        date: key,
        sum: data[key],
      }));
      // Sort the data by date
      formatted.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFormattedData(formatted);
      updateChartsData();
    }
  }, [ data ]);

  const updateChartsData = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: formattedData.map(({ date }) => date),
      },
    }));
    setSeries((prevSeries) => [
      {
        ...prevSeries[0],
        data: formattedData.map(({ sum }) => sum),
      },
    ]);
  };

  return (
    <Chart
      options={options}
      series={series}
      height={300}
      type="line"
      grid={{
        show: false,
      }}
    />
  );
}

StatisticsChart.propTypes = {
  data: PropTypes.object,
};
