import CardsList from '../components/CardsList';
import { getAllSeasons } from '../api/seasons.api';

export default function SeasonsList() {
  return (
    <main className='flex flex-column align-items-center py-8 px-4 md:px-5 lg:px-8 h-full'>
      <CardsList title='Listing all seasons of Formula-1' queryKey='seasons' queryFunction={getAllSeasons} canPin={false} />
    </main>
  );
}
