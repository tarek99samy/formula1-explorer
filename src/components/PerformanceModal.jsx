import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

PerformanceModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  queryKey: PropTypes.string,
  queryFunction: PropTypes.func,
  queryFunctionParams: PropTypes.object
};

function PerformanceModal({ visible, setVisible, queryKey, queryFunction, queryFunctionParams }) {
  const toast = useRef(null);
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, { ...queryFunctionParams }],
    queryFn: () => queryFunction({ ...queryFunctionParams })
  });

  useEffect(() => {
    if (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
    }
  }, [error]);

  const renderChart = (chartObject, index) => {
    if (!chartObject.type) {
      return null;
    }
    return (
      <div className='w-full my-3' key={chartObject.data.datasets[0].label}>
        <span className='text-lg'>{chartObject.data.datasets[0].label}</span>
        <Chart type={chartObject.type} data={chartObject.data} options={chartObject.options} />
        {index !== data.length - 1 && <Divider />}
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header='Performance Charts'
        visible={visible}
        className='w-11 lg:w-8'
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <div className='flex flex-column justify-content-center gap-3 w-full'>{isLoading ? <ProgressSpinner /> : data?.map(renderChart)}</div>
      </Dialog>
    </>
  );
}

export default PerformanceModal;
