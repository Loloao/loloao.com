export const formatDateToCn = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return `${month}月${day}日, ${year}`;
};
