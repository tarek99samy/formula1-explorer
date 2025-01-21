import React from 'react';
import { useParams } from 'react-router-dom';

export default function RacesList() {
  const pathParams = useParams();
  return (
    <main className='flex justify-content-center'>
      <h1>Listing of races of {pathParams.year}</h1>
    </main>
  );
}
