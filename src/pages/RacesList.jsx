import CardsList from '../components/CardsList';
import useUserPreferenceStore from '../store/UserPreference.store';
import { useParams } from 'react-router-dom';
import { getAllRaces } from '../api/races.api';

export default function RacesList() {
  const { season } = useParams();
  const pinnedRaces = useUserPreferenceStore((state) => state.pinnedRaces);

  return (
    <main className='page-container'>
      <CardsList
        title={`Listing races of ${season}`}
        queryKey='races'
        queryFunction={getAllRaces}
        queryFunctionParams={{ season, seasonPinnedRaces: pinnedRaces[season] }}
        canPin={true}
      />
    </main>
  );
}
