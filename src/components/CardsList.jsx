import '../styles/components/CardsList.scss';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Card from './Card';
import LoadingSkeleton from './LoadingSkeleton';
import Error from './Error';
import { CardsListViewTypes } from '../utils/components/CardsList.utils';

CardsList.propTypes = {
  title: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
  queryFunction: PropTypes.func.isRequired,
  queryFunctionParams: PropTypes.object,
  pageStep: PropTypes.number,
  highlighOptions: PropTypes.array,
  canHeighlight: PropTypes.bool,
  canPin: PropTypes.bool
};

export default function CardsList({
  title,
  queryKey,
  queryFunction,
  queryFunctionParams = {},
  pageStep = 10,
  highlighOptions = [],
  canHeighlight = false,
  canPin = false
}) {
  const toast = useRef(null);
  const [currentViewType, setCurrentViewType] = useState('grid');
  const [currentLimit, setCurrentLimit] = useState(pageStep);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, currentLimit, { ...queryFunctionParams }],
    queryFn: () => queryFunction({ limit: currentLimit, ...queryFunctionParams })
  });

  useEffect(() => {
    if (!isLoading && data) {
      setShowLoadMore(data.MRData.total > currentLimit);
    }
  }, [isLoading, data, currentLimit]);

  const renderToggleViewButton = (option) => <i className={option.icon}></i>;

  const handleChangeViewType = (e) => {
    const { value } = e.target;
    if (value) {
      setCurrentViewType(value);
    }
  };

  const handleChangeHeighlight = (e) => {
    setSelectedIds(e.value);
  };

  const handleLoadMore = () => {
    setCurrentLimit(currentLimit + pageStep);
  };

  if (isError) {
    return <Error />;
  }

  return (
    <main className='cardslist'>
      <Toast ref={toast} />
      <div className='cardslist__header'>
        <h1 className='cardslist__header__title'>{title}</h1>
        <div className='cardslist__header__actions'>
          {canHeighlight && (
            <MultiSelect value={selectedIds} onChange={handleChangeHeighlight} options={highlighOptions} placeholder='Select to highlight' />
          )}
          <SelectButton
            value={currentViewType}
            onChange={handleChangeViewType}
            itemTemplate={renderToggleViewButton}
            optionLabel='value'
            options={CardsListViewTypes}
            data-testid='toggle-view-type'
          />
        </div>
      </div>
      <div className={`cardslist__body cardslist__body--${currentViewType}`}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.MRData?.data.map((item) => (
            <Card
              key={item.id}
              className={`cardslist__body__item--${currentViewType}`}
              isHeighlighted={selectedIds.includes(item.id)}
              haveFooter={canPin}
              {...item}
            />
          ))
        )}
      </div>
      {showLoadMore ? (
        <div className='cardslist__footer'>
          <Button label='Load More' icon='pi pi-refresh' className='cardslist__footer__button' onClick={handleLoadMore} />
        </div>
      ) : null}
    </main>
  );
}
