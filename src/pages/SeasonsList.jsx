import React from 'react';
import CardsList from '../components/CardsList';
import { getAllSeasons } from '../api/seasons.api';

export default function SeasonsList() {
  return (
    <main className='flex flex-column align-items-center py-8 px-4 md:px-5 lg:px-8'>
      <h1>Listing all seasons of Formula-1</h1>
      <CardsList title='Seasons Listing' queryKey='seasons' queryFunction={getAllSeasons} canPin={true} />
    </main>
  );
}
