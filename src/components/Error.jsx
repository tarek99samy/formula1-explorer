import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Error() {
  return (
    <main className='generic-page-container'>
      <img src='/error.svg' alt='Error' className='generic-page-image' />
      <h1 className='generic-page-title'>Something went wrong, please try again</h1>
      <Link to='/'>
        <Button label='Go back to Home' />
      </Link>
    </main>
  );
}
