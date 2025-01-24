import '../styles/components/PerformanceModal.scss';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import Error from './Error';

PerformanceModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  queryKey: PropTypes.string,
  queryFunction: PropTypes.func,
  queryFunctionParams: PropTypes.object
};

const renderChart = (chartObject, index, data) => {
  if (!chartObject.type) {
    return null;
  }
  return (
    <div className='performance-modal__chart' key={chartObject.data.datasets[0].label} data-testid='performance-modal-chart'>
      <span className='performance-modal__chart__title'>{chartObject.data.datasets[0].label}</span>
      <Chart type={chartObject.type} data={chartObject.data} options={chartObject.options} />
      {index !== data.length - 1 && <Divider />}
    </div>
  );
};

function PerformanceModal({ visible, setVisible, queryKey, queryFunction, queryFunctionParams }) {
  const toast = useRef(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, { ...queryFunctionParams }],
    queryFn: () => queryFunction({ ...queryFunctionParams })
  });

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header='Performance Charts'
        visible={visible}
        className='performance-modal'
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <div className='performance-modal__container'>
          {isLoading ? <ProgressSpinner data-testid='performance-modal-spinner' /> : data.map((item, index) => renderChart(item, index, data))}
        </div>
      </Dialog>
    </>
  );
}

export default PerformanceModal;
