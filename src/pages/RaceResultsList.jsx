import React from 'react';
import { useParams } from 'react-router-dom';

export default function RaceResultsList() {
  const pathParams = useParams();
  return (
    <main className='flex justify-content-center'>
      <h1>
        Listing of results for season {pathParams.year} round {pathParams.round}
      </h1>
    </main>
  );
}
