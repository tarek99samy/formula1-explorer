import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import Card from './Card';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/components/CardsList.scss';

CardsList.propTypes = {
  title: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
  queryFunction: PropTypes.func.isRequired,
  pageStep: PropTypes.number,
  canHeighlight: PropTypes.bool,
  canPin: PropTypes.bool
};

const viewTypes = [
  { value: 'grid', icon: 'pi pi-th-large' },
  { value: 'list', icon: 'pi pi-bars' }
];
const viewTypeClassName = {
  list: { parent: 'flex flex-column w-full gap-5', child: 'flex flex-column w-full' },
  grid: { parent: 'grid gap-5', child: 'col-12 sm:col-6 md:col-5 lg:col-3' }
};

export default function CardsList({ title, queryKey, queryFunction, pageStep = 10, canHeighlight = false, canPin = false }) {
  const queryClient = useQueryClient();
  const [currentViewType, setCurrentViewType] = useState('grid');
  const [currentOffset, setCurrentOffset] = useState(pageStep);
  const [selectedId, setSelectedId] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, currentOffset],
    queryFn: () => queryFunction(currentOffset, 0)
  });

  const renderToggleViewButton = (option) => <i className={option.icon}></i>;

  const handleChangeViewType = (e) => {
    const { value } = e.target;
    if (value) {
      setCurrentViewType(value);
    }
  };

  const handleChangeHeighlight = (e) => {
    setSelectedId(e.value);
  };

  const handleLoadMore = () => {
    setCurrentOffset(currentOffset + pageStep);
  };

  return (
    <main className='flex flex-column gap-3 w-full'>
      <div className='flex justify-content-between'>
        <h1 className='text-white'>{title}</h1>
        <div className='flex align-items-center gap-3'>
          <SelectButton
            value={currentViewType}
            onChange={handleChangeViewType}
            itemTemplate={renderToggleViewButton}
            optionLabel='value'
            options={viewTypes}
          />
          {canHeighlight && (
            <div className='flex flex-column gap-2'>
              <label>Select to heighlight</label>
              <Dropdown value={selectedId} onChange={handleChangeHeighlight} options={data.heighlightOptions | []} />
            </div>
          )}
        </div>
      </div>
      <div className={viewTypeClassName[currentViewType].parent}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.MRData?.data.map((item) => <Card key={item.id} className={viewTypeClassName[currentViewType].child} haveFooter={canPin} {...item} />)
        )}
      </div>
      {!isLoading && data?.MRData?.limit + data?.MRData?.offset < data?.MRData?.total ? (
        <div className='flex justify-content-center pt-5'>
          <Button label='Load More' icon='pi pi-refresh' onClick={handleLoadMore} />
        </div>
      ) : null}
    </main>
  );
}
