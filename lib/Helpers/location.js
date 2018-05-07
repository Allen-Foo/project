const toRad = (value) => {
  return value * Math.PI / 180;
}

const calcDistanceBetween = (lat1, lon1, lat2, lon2) => {
  // Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
  let R = 6371;//3958.7558657440545; // Radius of earth in Miles
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}

export {
  calcDistanceBetween
}