const julian = require('julian')

/**
* receives date in julian format and convert in gregorian format
* @param MJD:date in julian format
* @returns {string} : date in gregorian format
*/
function jdToGregorian (mjd) {
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
function gregorianToJd (dateObj) {
  if (dateObj === null) {
    return null
  }
  const mjulianDate = dateObj / 86400000 + 40587
  return mjulianDate
}

function jdToDate (mjd) {
  if (mjd === undefined || mjd === null || mjd === '') {
    return null
  }
  const date = (mjd - 40587) * 86400000
  return new Date(date)
}

export { gregorianToJd, jdToGregorian, jdToDate }
