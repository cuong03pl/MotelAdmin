export const convertPrice = (price) => {
  if (!price) return "0";
  
  if (price < 1) {
    return `${(price * 1000000).toLocaleString("vi-VN")}đ`;
  }
  return `${price?.toLocaleString("vi-VN")} triệu`;
};

export const formatPrice = (price) => {
  return price.toLocaleString("vi-VN");
};
