import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
const SeasonsList = lazy(() => import('./pages/SeasonsList'));
const RacesList = lazy(() => import('./pages/RacesList'));
const RaceResultsList = lazy(() => import('./pages/RaceResultsList'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-column justify-content-between'>
        <Navbar />
        <div className='h-full'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/seasons' element={<SeasonsList />} />
            <Route path='/races/:season' element={<RacesList />} />
            <Route path='/results/:season/:round' element={<RaceResultsList />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
