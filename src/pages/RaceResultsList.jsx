import { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAllRaceResults, getDriversPerformance } from '../api/race-result.api';
import CardsList from '../components/CardsList';
const PerformanceModal = lazy(() => import('../components/PerformanceModal'));

export default function RaceResultsList() {
  const { season, round } = useParams();
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  return (
    <main className='flex flex-column align-items-center py-8 px-4 md:px-5 lg:px-8 h-full'>
      <Button label='See Performance Visualization' icon='pi pi-chart-bar' onClick={() => setShowPerformanceModal(true)} />
      <Suspense fallback={<ProgressSpinner />}>
        {showPerformanceModal && (
          <PerformanceModal
            visible={showPerformanceModal}
            setVisible={setShowPerformanceModal}
            queryKey='performance-visualization'
            queryFunction={getDriversPerformance}
            queryFunctionParams={{ season, round }}
          />
        )}
      </Suspense>
      <CardsList
        title={`Results for round ${round}, season ${season}`}
        queryKey='results'
        queryFunction={getAllRaceResults}
        queryFunctionParams={{ season, round }}
        canHeighlight={true}
      />
    </main>
  );
}
