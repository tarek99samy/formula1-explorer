import '../styles/components/Footer.scss';

export default function Footer() {
  return (
    <footer className='footer py-5 md:px-8 px-5'>
      <div className='flex align-items-center w-full'>
        <img src='/F1.svg' alt='Formula 1 logo' className='md:w-1 w-2' />
        <span className='text-lg'>Formula-1 Explorer</span>
      </div>
      <small>&copy; {new Date().getFullYear()} All rights reserved.</small>
    </footer>
  );
}
