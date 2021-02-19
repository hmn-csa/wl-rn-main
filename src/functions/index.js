
export const moneyFormat = n => {
  const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
  return money.substring(0, money.length - 2)
}

export const calInitialRegion = (listAppls) => {

  if (listAppls.length === 0)
    return {
      latitude: 10.7888,
      longitude: 106.7752,
      latitudeDelta: 1,
      longitudeDelta: 1,
    }

  const listLat = listAppls.map(appl => appl.lat)
  const listLon = listAppls.map(appl => appl.lon)
  const meanLat = listLat.reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length
  const latDetal = Math.max.apply(Math, listLat) - Math.min.apply(Math, listLat) + 0.05
  const lonDetal = Math.max.apply(Math, listLon) - Math.min.apply(Math, listLon) + 0.05

  const meanLon = listAppls.map(appl => appl.lon).reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length

  return {
    latitude: meanLat,
    longitude: meanLon,
    latitudeDelta: latDetal,
    longitudeDelta: lonDetal,
  }
}