export const generateRandomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const opacity = 0.5;
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
