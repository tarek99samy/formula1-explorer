import axiosClient from '../utils/AxiosClient';

const prepareRaceResults = (result) => {
  const finishTime = result.Time ? result.Time.time : 'N/A';
  const fastestSpeed = result.FastestLap ? `${result.FastestLap.AverageSpeed.speed} ${result.FastestLap.AverageSpeed.units}` : 'N/A';
  return {
    id: result.number,
    title: `${result.positionText} - ${result.Driver.givenName}, ${result.Driver.familyName}`,
    subtitle: `${result.Driver.nationality}`,
    bodyMetadata: [
      {
        type: 'url',
        content: `Team: ${result.Constructor.name}, ${result.Constructor.nationality}`,
        url: result.Constructor.url
      },
      {
        type: 'text',
        content: `Finish time: ${finishTime}`
      },
      {
        type: 'text',
        content: `Grid position: ${result.grid}`
      },
      {
        type: 'text',
        content: `Fastest Lap Speed: ${fastestSpeed}`
      }
    ],
    detailsUrl: result.Driver.url
  };
};

export async function getAllRaceResults({ limit = null, season, round, skipFormat = false }) {
  try {
    let requestUrl = `/${season}/${round}/results.json`;
    if (limit) {
      requestUrl = `${requestUrl}?limit=${limit}`;
    }
    const response = await axiosClient.get(requestUrl);
    if (skipFormat) {
      return response.data.MRData.RaceTable.Races[0].Results;
    }
    const preparedData = response.data.MRData.RaceTable.Races[0].Results.map(prepareRaceResults);
    const formatedData = {
      MRData: {
        ...response.data.MRData,
        data: preparedData
      }
    };
    return formatedData;
  } catch (error) {
    throw `Error while fetching race results: ${error?.message || 'internal error'}`;
  }
}

const calculateYAxisRange = (data, padding = 10) => {
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  return {
    min: minValue - padding > 0 ? minValue - padding : 0,
    max: maxValue + padding
  };
};

const getChartOptions = (data) => {
  const { min, max } = calculateYAxisRange(data);
  return {
    maintainAspectRatio: false,
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Time: ${context.raw} ms`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min,
        max,
        ticks: {
          stepSize: Math.ceil((max - min) / data.length),
          callback: (value) => `${value} ms`
        },
        title: {
          display: true,
          text: 'Time (ms)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Drivers'
        }
      }
    }
  };
};

export async function getDriversPerformance({ season, round }) {
  try {
    const results = await getAllRaceResults({ season, round, skipFormat: true });
    const driverNames = results.map((result) => result.Driver.givenName);
    const raceTimes = results.map((result) => parseInt(result?.Time?.millis || 0));
    const averageSpeeds = results.map((result) => parseFloat(result.FastestLap?.AverageSpeed?.speed || 0));
    const fastestLapTimes = results.map((result) => parseFloat(result.FastestLap?.Time?.time?.replace(':', '.')) * 1000);
    const timeDifferences = results.map((result) => parseInt(result?.Time?.millis || 0) - raceTimes[0]);

    const fastestLapData = {
      labels: driverNames,
      datasets: [
        {
          label: 'Fastest Lap Time (ms)',
          backgroundColor: '#66BB6A',
          data: fastestLapTimes
        }
      ]
    };
    const averageSpeedData = {
      labels: driverNames,
      datasets: [
        {
          label: 'Average Speed (kph)',
          backgroundColor: '#FFA726',
          fill: true,
          data: averageSpeeds
        }
      ]
    };
    const timeDifferenceData = {
      labels: driverNames,
      datasets: [
        {
          label: 'Time Difference (ms)',
          backgroundColor: '#42A5F5',
          data: timeDifferences
        }
      ]
    };

    return [
      { type: 'bar', data: averageSpeedData, options: { ...getChartOptions(averageSpeeds), indexAxis: 'y' } },
      { type: 'bar', data: fastestLapData, options: getChartOptions(fastestLapTimes) },
      { type: 'bar', data: timeDifferenceData, options: getChartOptions(timeDifferences) }
    ];
  } catch (error) {
    throw `Error while fetching drivers performance: ${error?.message || 'internal error'}`;
  }
}
