
export const moneyFormat = n => {
  const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
  return money.substring(0, money.length - 2)
}
