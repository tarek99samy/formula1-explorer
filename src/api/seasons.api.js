import axiosClient from '../utils/AxiosClient';
import { prepareSeason } from '../utils/api/seasons.utils';

export async function getAllSeasons(params) {
  try {
    const response = await axiosClient.get(`/seasons.json?limit=${params.limit}`);
    const formattedData = {
      MRData: {
        ...response.data.MRData,
        data: response.data.MRData.SeasonTable.Seasons.map(prepareSeason)
      }
    };
    return formattedData;
  } catch (error) {
    throw `Error while fetching seasons: ${error?.message || 'internal error'}`;
  }
}
