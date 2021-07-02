export const currency = num => {
  const n = Math.round(num); // 소수점 자르기
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
