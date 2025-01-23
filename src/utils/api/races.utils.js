import useUserPreferenceStore from '../../store/UserPreference.store';
const { addPinnedRace, removePinnedRace } = useUserPreferenceStore.getState((state) => state);

export const prepareRaces = (season, race, seasonPinnedRaces = []) => {
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
