import { Sorting } from '../decorators/sorting-params.decorator';

export const getPageCount = (itemsCount: number, limit: number): number => {
  return Math.ceil(itemsCount / limit);
};

export const getOrder = (sort?: Sorting) =>
  sort ? { [sort.property]: sort.direction } : {};
