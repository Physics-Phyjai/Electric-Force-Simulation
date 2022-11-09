const randomPosition = () => {
  return Math.round(Math.random() * 20) - 10;
};

const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 80%)`;
};
const randomChargeValue = () => {
  return [-2, -1, 1, 2][Math.floor(Math.random() * 4)];
};

export { randomPosition, randomPastelColor, randomChargeValue };
