export const getUniqueListBy = (arr: any[], key: any) => {
  try {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  } catch (e) {
    return [];
  }
};
