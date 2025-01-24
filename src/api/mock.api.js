export async function getMockData({ limit }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        MRData: {
          limit,
          offset: 0,
          total: '20',
          data: Array.from({ length: limit }, (_, index) => ({
            id: Date.now() + index,
            title: `Test title ${index + 1}`,
            bodyMetadata: [
              {
                type: 'text',
                content: 'Test text Content'
              }
            ]
          }))
        }
      });
    }, 100);
  });
}

export async function getMockDataFail() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Mock request rejection'));
    }, 100);
  });
}

export async function getMockChartsData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          type: 'bar',
          data: {
            labels: ['test1', 'test2'],
            datasets: [
              {
                label: 'Test Data 1',
                backgroundColor: '#FFA726',
                data: [1, 2]
              }
            ]
          },
          options: {}
        }
      ]);
    }, 100);
  });
}
