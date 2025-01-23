import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SeasonsList from './pages/SeasonsList';
import RacesList from './pages/RacesList';
import RaceResultsList from './pages/RaceResultsList';
import NotFound from './pages/NotFound';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/seasons' element={<SeasonsList />} />
        <Route path='/races/:season' element={<RacesList />} />
        <Route path='/results/:season/:round' element={<RaceResultsList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
