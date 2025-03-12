export const convertTime = (time) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleString("vi-VN");
  return formattedDate;
};
