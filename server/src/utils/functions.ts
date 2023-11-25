export const getPageCount = (itemsCount: number, limit: number): number => {
  return Math.ceil(itemsCount / limit);
};
