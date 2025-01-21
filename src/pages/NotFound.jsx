import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function NotFound() {
  return (
    <main className='flex flex-column align-items-center justify-content-center text-center p-4'>
      <img src='/404.svg' alt='Page Not Found' className='w-4' />
      <h1>Page Not Found</h1>
      <h2>Sorry, the page you are looking for does not exist.</h2>
      <Link to='/'>
        <Button label='Go back to Home' />
      </Link>
    </main>
  );
}
