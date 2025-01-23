export const CardsListViewTypes = [
  { value: 'list', icon: 'pi pi-bars' },
  { value: 'grid', icon: 'pi pi-th-large' }
];

export const viewTypeClassName = {
  list: { parent: 'flex flex-column w-full gap-5', child: 'flex flex-column w-full' },
  grid: { parent: 'grid justify-content-center gap-5 m-0', child: 'col-12 sm:col-auto md:col-5 lg:col-3 xl:col-2' }
};
