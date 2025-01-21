import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SeasonsList from './pages/SeasonsList';
import RacesList from './pages/RacesList';
import RaceResultsList from './pages/RaceResultsList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/seasons' element={<SeasonsList />} />
        <Route path='/races/:year' element={<RacesList />} />
        <Route path='/results/:year/:round' element={<RaceResultsList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
