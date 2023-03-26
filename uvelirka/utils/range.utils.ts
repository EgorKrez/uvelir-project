export const range = (from: number, to: number): number[] => {
  const rangeItems: number[] = [];

  for (let i = from; i <= to; i++) {
    rangeItems.push(i);
  }

  return rangeItems;
};
