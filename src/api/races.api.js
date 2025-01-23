import axiosClient from '../utils/AxiosClient';
import useUserPreferenceStore from '../store/UserPreference.store';

const { addPinnedRace, removePinnedRace } = useUserPreferenceStore.getState((state) => state);

const prepareRaces = (season, race, seasonPinnedRaces = []) => {
  const isHeighlighted = seasonPinnedRaces.filter((r) => r.round === race.round).length > 0;
  return {
    id: race.round,
    title: `Round ${race.round} - ${race.raceName}`,
    subtitle: `@ ${race.Circuit.circuitName}`,
    bodyMetadata: [
      {
        type: 'date',
        content: race.date
      },
      {
        type: 'url',
        content: `${race.Circuit.circuitName}, ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
        url: race.Circuit.url
      },
      {
        type: 'url',
        content: 'View more at Wikipedia',
        url: race.url
      }
    ],
    isHeighlighted,
    footerMetadata: {
      savePreference: () => addPinnedRace(season, race),
      removePreference: () => removePinnedRace(season, race)
    },
    detailsUrl: `/results/${season}/${race.round}`
  };
};

export async function getAllRaces({ limit, season, seasonPinnedRaces }) {
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
}
