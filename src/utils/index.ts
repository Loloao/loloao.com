interface Option {
  doNotShowYear?: boolean;
}

export const formatDateToCn = (
  time: string,
  option: Option = {
    doNotShowYear: false,
  }
) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  if (option.doNotShowYear) {
    return `${month}月${day}日`;
  }
  return `${month}月${day}日, ${year}`;
};
