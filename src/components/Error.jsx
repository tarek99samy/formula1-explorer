import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Error() {
  return (
    <main className='flex flex-column align-items-center justify-content-center text-center p-4 h-screen'>
      <img src='/error.svg' alt='Error' />
      <h1>Unexpected Error</h1>
      <h2>Something went wrong, please try again</h2>
      <Link to='/'>
        <Button label='Go back to Home' />
      </Link>
    </main>
  );
}
