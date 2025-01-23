import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { getAllRaceResults, getDriversPerformance } from '../api/race-result.api';
import CardsList from '../components/CardsList';
import PerformanceModal from '../components/PerformanceModal';

export default function RaceResultsList() {
  const { season, round } = useParams();
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  return (
    <main className='flex flex-column align-items-center py-8 px-4 md:px-5 lg:px-8'>
      <h1>
        Results for round {round}, season {season}
      </h1>
      <Button label='See Performance Visualization' icon='pi pi-chart-bar' onClick={() => setShowPerformanceModal(true)} />
      <PerformanceModal
        visible={showPerformanceModal}
        setVisible={setShowPerformanceModal}
        queryKey='performance-visualization'
        queryFunction={getDriversPerformance}
        queryFunctionParams={{ season, round }}
      />
      <CardsList
        title='Results Standings'
        queryKey='results'
        queryFunction={getAllRaceResults}
        queryFunctionParams={{ season, round }}
        canHeighlight={true}
      />
    </main>
  );
}
