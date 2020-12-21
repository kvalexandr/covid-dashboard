export const fomatNumber = (num) => {
  return num.toLocaleString('ru-RU', {
    maximumFractionDigits: 0
  });
};
