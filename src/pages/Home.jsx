export default function Home() {
  return (
    <main className='flex flex-column align-items-center justify-content-center w-full h-screen px-3 pt-8 md:pt-5'>
      <img src='/F1.svg' alt='Formula 1 logo' className='md:w-3 w-6' />
      <h1 className='text-center'>Welcome. This is your Formula-1 Explorer</h1>
      <p className='text-center'>
        Explore the world of Formula 1 racing with detailed information on teams, drivers, and races. Stay updated with the latest news and enjoy a
        comprehensive database of historical data.
      </p>
    </main>
  );
}
