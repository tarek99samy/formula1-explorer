import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';

PerformanceModal.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};

function PerformanceModal({ data, visible, setVisible }) {
  const renderChart = (data) => {
    return <Chart type={data.type} data={data.data} options={data.options} />;
  };

  return (
    <Dialog header='Performance Charts' visible={visible} className='w-6' onHide={() => setVisible(false)} draggable={false} resizable={false}>
      {/* {data.map((data, index) => (
        <div key={index} className='p-mb-4'>
          {renderChart(data)}
        </div>
      ))} */}
    </Dialog>
  );
}

export default PerformanceModal;
