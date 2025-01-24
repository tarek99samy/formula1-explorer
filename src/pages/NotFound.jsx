import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function NotFound() {
  return (
    <main className='generic-page-container'>
      <img src='/404.svg' alt='Page Not Found' className='generic-page-image' />
      <h1 className='generic-page-title'>Page Not Found</h1>
      <p className='generic-page-description'>Sorry, the page you are looking for does not exist.</p>
      <Link to='/'>
        <Button label='Go back to Home' />
      </Link>
    </main>
  );
}
