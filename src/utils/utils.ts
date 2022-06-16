export const isNumber = (n: any): boolean => typeof n === 'number' && !Number.isNaN(n);

export const getCssValue = (value: any) => {
  if (!isNumber(value)) {
    return value || 0;
  }
  return value || 0;
};
