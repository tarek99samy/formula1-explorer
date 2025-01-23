import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserPreferenceStore = create(
  persist(
    (set) => ({
      pinnedRaces: {},
      addPinnedRace: (season, race) =>
        set((state) => {
          const updatedPinnedRaces = { ...state.pinnedRaces };
          if (!updatedPinnedRaces[season]) {
            updatedPinnedRaces[season] = [];
          }
          updatedPinnedRaces[season].push(race);
          return { pinnedRaces: updatedPinnedRaces };
        }),
      removePinnedRace: (season, race) =>
        set((state) => {
          const updatedPinnedRaces = { ...state.pinnedRaces };
          if (updatedPinnedRaces[season]) {
            updatedPinnedRaces[season] = updatedPinnedRaces[season].filter((r) => r.round !== race.round);
            if (updatedPinnedRaces[season].length === 0) {
              delete updatedPinnedRaces[season];
            }
          }
          return { pinnedRaces: updatedPinnedRaces };
        })
    }),
    {
      name: 'user-preference-store'
    }
  )
);

export default useUserPreferenceStore;
