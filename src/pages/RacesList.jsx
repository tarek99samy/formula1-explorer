import { useParams } from 'react-router-dom';
import CardsList from '../components/CardsList';
import { getAllRaces } from '../api/races.api';
import useUserPreferenceStore from '../store/UserPreference.store';

export default function RacesList() {
  const { season } = useParams();
  const pinnedRaces = useUserPreferenceStore((state) => state.pinnedRaces);

  return (
    <main className='flex flex-column align-items-center py-8 px-4 md:px-5 lg:px-8'>
      <h1>Listing races of {season}</h1>
      <CardsList
        title='Season Races Listing'
        queryKey='races'
        queryFunction={getAllRaces}
        queryFunctionParams={{ season, seasonPinnedRaces: pinnedRaces[season] }}
        canPin={true}
      />
    </main>
  );
}
