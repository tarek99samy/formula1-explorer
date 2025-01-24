import useUserPreferenceStore from '../store/UserPreference.store';
import axiosClient from '../utils/AxiosClient';
import { getChartsPrepared, prepareDrivers, prepareRaceResults } from '../utils/api/race-result.utils';

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
    const driversList = response.data.MRData.RaceTable.Races[0].Results.map(prepareDrivers);
    useUserPreferenceStore.setState({ currentDrivers: driversList });
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

export async function getDriversPerformance({ season, round }) {
  try {
    const results = await getAllRaceResults({ season, round, skipFormat: true });
    return getChartsPrepared(results);
  } catch (error) {
    throw `Error while fetching drivers performance: ${error?.message || 'internal error'}`;
  }
}
