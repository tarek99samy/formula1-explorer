import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../styles/components/Card.scss';

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
  detailsUrl: PropTypes.string.isRequired,
  isHeighlighted: PropTypes.bool,
  haveFooter: PropTypes.bool,
  footerMetadata: PropTypes.shape({
    savePreference: PropTypes.func,
    removePreference: PropTypes.func
  })
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
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const renderBody = (bodyItem, index) => {
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

  return (
    <div className={`${className} card ${isHeighlighted && 'card--heighlighted'}`}>
      <div className='card__header'>
        <span className='card__title'>{title}</span>
        <span className='card__subtitle'>{subtitle}</span>
      </div>
      <div className='card__body'>{bodyMetadata.map((bodyItem, index) => renderBody(bodyItem, index))}</div>
      <div className='card__footer'>
        {haveFooter &&
          (isHeighlighted ? (
            <Button label='Unpin' icon='pi pi-thumbtack' onClick={() => footerMetadata.removePreference()} severity='secondary' />
          ) : (
            <Button label='Pin' icon='pi pi-thumbtack' onClick={() => footerMetadata.savePreference()} severity='danger' />
          ))}
        {detailsUrl && (
          <Link to={detailsUrl} className='card__footer__link'>
            <Button label='Learn More' icon='pi pi-eye' severity='secondary' />
          </Link>
        )}
      </div>
    </div>
  );
}
