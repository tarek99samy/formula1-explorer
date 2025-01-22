import React from 'react';
import { useParams } from 'react-router-dom';

export default function RacesList() {
  const { year } = useParams();
  return (
    <main className='flex justify-content-center py-8'>
      <h1>Listing races of {year}</h1>
    </main>
  );
}
