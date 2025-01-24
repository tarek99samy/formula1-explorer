import CardsList from '../components/CardsList';
import { getAllSeasons } from '../api/seasons.api';

export default function SeasonsList() {
  return (
    <main className='page-container'>
      <CardsList title='Listing all seasons of Formula-1' queryKey='seasons' queryFunction={getAllSeasons} canPin={false} />
    </main>
  );
}
