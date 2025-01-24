import '../styles/components/Navbar.scss';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

export default function Navbar() {
  const itemRenderer = (item) => (
    <Link to={item.url} className='navbar__item p-menuitem-link'>
      <i className={`${item.icon} p-menuitem-icon`} />
      <span className='p-menuitem-text'>{item.label}</span>
    </Link>
  );
  const items = [
    {
      label: 'Seasons',
      icon: 'pi pi-history',
      url: '/seasons',
      template: itemRenderer
    },
    {
      label: 'Latest Races of 2024',
      icon: 'pi pi-flag-fill',
      url: '/races/2024',
      template: itemRenderer
    },
    {
      label: 'Latest Race Results',
      icon: 'pi pi-crown',
      url: '/results/2024/24',
      template: itemRenderer
    }
  ];

  const start = (
    <Link to='/'>
      <img alt='logo' src='/F1.svg' className='navbar__logo' />
    </Link>
  );

  return (
    <nav>
      <Menubar model={items} start={start} className='navbar' />
    </nav>
  );
}
