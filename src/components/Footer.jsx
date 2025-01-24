import '../styles/components/Footer.scss';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <img src='/F1.svg' alt='Formula 1 logo' className='footer__logo' />
        <span className='footer__title'>Formula-1 Explorer</span>
      </div>
      <small>&copy; {new Date().getFullYear()} All rights reserved.</small>
    </footer>
  );
}
