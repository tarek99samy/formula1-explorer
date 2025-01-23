import axiosClient from '../utils/AxiosClient';
import { prepareRaces } from '../utils/api/races.utils';

export async function getAllRaces({ limit, season, seasonPinnedRaces }) {
  try {
    const response = await axiosClient.get(`/${season}/races.json?limit=${limit}`);
    let sortedData = seasonPinnedRaces || [];
    const filteredRaces = response.data.MRData.RaceTable.Races.filter((race) => !sortedData.find((pinnedRace) => pinnedRace.round === race.round));
    sortedData = sortedData.concat(filteredRaces);
    sortedData = sortedData.map((race) => prepareRaces(season, race, seasonPinnedRaces));

    const formattedData = {
      MRData: {
        ...response.data.MRData,
        data: sortedData
      }
    };
    return formattedData;
  } catch (error) {
    throw `Error while fetching races: ${error?.message || 'internal error'}`;
  }
}
