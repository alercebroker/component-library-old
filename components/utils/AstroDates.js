const julian = require('julian')

/**
 * receives date in julian format and convert in gregorian format
 * @param MJD:date in julian format
 * @returns {string} : date in gregorian format
 */
function jdToGregorian(mjd) {
  if (mjd === undefined || mjd === null) {
    return null
  }
  const jd = Number(mjd) + 2400000
  const date = julian.toDate(jd)
  const year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  const day = date.getUTCDate()
  return year + '-' + month + '-' + day
}

/**
 * receives date in gregorian format and convert in julian format
 * @param dateObj:date Object
 * @returns {number} : date in jualian format
 */
function gregorianToJd(dateObj) {
  if (dateObj === null) {
    return null
  }
  const mjulianDate = dateObj / 86400000 + 40587
  return mjulianDate
}

function jdToDate(mjd) {
  if (mjd === undefined || mjd === null || mjd === '') {
    return null
  }
  const date = (mjd - 40587) * 86400000
  return new Date(date)
}

/* Based in: http://www.bdnyc.org/2012/10/decimal-deg-to-hms/ */
function raDectoHMS(ra, dec, precision=2) {
  if (dec) {
    const sign = dec < 0 ? '-' : '+'
    dec = Math.abs(dec)
    const deg = Math.floor(dec)
    const decM = Math.abs(Math.floor((dec - deg) * 60))
    const decS = ((Math.abs((dec - deg) * 60) - decM) * 60).toFixed(precision)
    dec = `${sign}${deg}:${decM}:${decS}`
  }
  if (ra) {
    const sign = ra < 0 ? '-' : '\xA0'
    ra = Math.abs(ra)
    const raH = Math.floor(ra / 15)
    const raM = Math.floor((ra / 15 - raH) * 60)
    const raS = (((ra / 15 - raH) * 60 - raM) * 60).toFixed(precision + 1)
    ra = `${sign}${raH}:${raM}:${raS}`
  }
  return `${ra} ${dec}`
}

function hmsToDegrees(hrs, min, sec){
  const degrees = (hrs + min / 60 + sec / 3600)
  return `${degrees}`
}

export { gregorianToJd, jdToGregorian, jdToDate, raDectoHMS, hmsToDegrees }
