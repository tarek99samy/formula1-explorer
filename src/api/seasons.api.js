import axiosClient from '../utils/AxiosClient';

export async function getAllSeasons(params) {
  const response = await axiosClient.get(`/seasons.json?limit=${params.limit}`);
  const formattedData = {
    MRData: {
      ...response.data.MRData,
      data: response.data.MRData.SeasonTable.Seasons.map((item) => ({
        id: item.season,
        title: `Season ${item.season}`,
        bodyMetadata: [
          {
            type: 'text',
            content: item.season
          },
          {
            type: 'url',
            content: 'View more at Wekipedia',
            url: item.url
          }
        ],
        detailsUrl: `/races/${item.season}`
      }))
    }
  };
  return formattedData;
}
