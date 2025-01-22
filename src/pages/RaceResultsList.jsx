import React from 'react';
import { useParams } from 'react-router-dom';

export default function RaceResultsList() {
  const { year, round } = useParams();

  return (
    <main className='flex justify-content-center py-8'>
      <h1>
        Listing results for season {year} round {round}
      </h1>
    </main>
  );
}
