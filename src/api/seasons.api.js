import axiosClient from '../utils/AxiosClient';

const prepareSeason = (season) => ({
  id: season.season,
  title: `Season ${season.season}`,
  bodyMetadata: [
    {
      type: 'text',
      content: season.season
    },
    {
      type: 'url',
      content: 'View more at Wekipedia',
      url: season.url
    }
  ],
  detailsUrl: `/races/${season.season}`
});

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
