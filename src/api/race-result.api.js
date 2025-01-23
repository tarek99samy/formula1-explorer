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

export async function getAllRaceResults({ limit, season, round }) {
  const response = await axiosClient.get(`/${season}/${round}/results.json?limit=${limit}`);
  const preparedData = response.data.MRData.RaceTable.Races[0].Results.map(prepareRaceResults);
  const formatedData = {
    MRData: {
      ...response.data.MRData,
      data: preparedData
    }
  };
  return formatedData;
}
