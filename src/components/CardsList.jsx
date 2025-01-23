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
import { viewTypeClassName, CardsListViewTypes } from '../utils/components/CardsList.utils';

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
    <main className='flex flex-column gap-3 w-full'>
      <Toast ref={toast} />
      <div className='flex flex-column md:flex-row justify-content-between'>
        <h1 className='text-white'>{title}</h1>
        <div className='flex align-items-center gap-3'>
          {canHeighlight && (
            <MultiSelect value={selectedIds} onChange={handleChangeHeighlight} options={highlighOptions} placeholder='Select to highlight' />
          )}
          <SelectButton
            value={currentViewType}
            onChange={handleChangeViewType}
            itemTemplate={renderToggleViewButton}
            optionLabel='value'
            options={CardsListViewTypes}
          />
        </div>
      </div>
      <div className={viewTypeClassName[currentViewType].parent}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.MRData?.data.map((item) => <Card key={item.id} className={viewTypeClassName[currentViewType].child} haveFooter={canPin} {...item} />)
        )}
      </div>
      {showLoadMore ? (
        <div className='flex justify-content-center pt-5'>
          <Button label='Load More' icon='pi pi-refresh' className='w-10 md:w-5 lg:w-4' onClick={handleLoadMore} />
        </div>
      ) : null}
    </main>
  );
}
