import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildData = (data, caseType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date];
  }
  return chartData;
};

function LineGraph({ countryCode }) {
  const [data, setData] = useState([]);
  if (countryCode === "World Wide") {
    countryCode = "all";
  }
  useEffect(() => {
    const getData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`
      )
        .then((response) => response.json())
        .then((data) => {
          if (countryCode === "all") {
            const chartData = buildData(data);
            setData(chartData);
          } else {
            const chartData = buildData(data.timeline);
            setData(chartData);
          }
        });
    };
    getData();
  }, [countryCode]);

  return (
    <div style={{ marginTop: "1rem" }}>
      {data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
