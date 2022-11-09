const to2Decimal = (num: number) => {
  return Math.round(num * 100) / 100;
};

const toPointFive = (num: number) => {
  return Math.round(num * 2) / 2;
};

export { to2Decimal, toPointFive };
