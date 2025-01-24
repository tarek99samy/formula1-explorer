import '../styles/components/Card.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { formatDate } from '../utils/global.utils';

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string.isRequired,
  bodyMetadata: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired,
  detailsUrl: PropTypes.string,
  isHeighlighted: PropTypes.bool,
  haveFooter: PropTypes.bool,
  footerMetadata: PropTypes.shape({
    savePreference: PropTypes.func,
    removePreference: PropTypes.func
  })
};

const renderCardBody = (bodyItem, index) => {
  switch (bodyItem.type) {
    case 'date':
      return (
        <span key={index} className='card__body__item'>
          {formatDate(bodyItem.content)}
        </span>
      );
    case 'url':
      return (
        <Link key={index} to={bodyItem.url} className='card__body__item underline'>
          {bodyItem.content}
        </Link>
      );
    case 'text':
      return (
        <span key={index} className='card__body__item'>
          {bodyItem.content}
        </span>
      );
    default:
      return null;
  }
};

export default function Card({
  title,
  subtitle,
  className,
  bodyMetadata,
  detailsUrl,
  isHeighlighted = false,
  haveFooter = false,
  footerMetadata = {}
}) {
  return (
    <div className={`${className} card ${isHeighlighted && 'card--heighlighted'}`} data-testid='card'>
      <div className='card__header'>
        <span className='card__title'>{title}</span>
        <span className='card__subtitle'>{subtitle}</span>
      </div>
      <div className='card__body'>{bodyMetadata.map((bodyItem, index) => renderCardBody(bodyItem, index))}</div>
      <div className='card__footer'>
        {haveFooter &&
          (isHeighlighted ? (
            <Button
              label='Unpin'
              icon='pi pi-thumbtack'
              onClick={() => footerMetadata.removePreference()}
              className='w-full lg:w-11 xl:w-full max-w-18rem'
              severity='secondary'
            />
          ) : (
            <Button
              label='Pin'
              icon='pi pi-thumbtack'
              onClick={() => footerMetadata.savePreference()}
              className='w-full lg:w-11 xl:w-full max-w-18rem'
              severity='danger'
            />
          ))}
        <Link to={detailsUrl} className=''>
          <Button label='Learn More' icon='pi pi-eye' className='w-full lg:w-11 xl:w-full max-w-18rem' severity='secondary'></Button>
        </Link>
      </div>
    </div>
  );
}
