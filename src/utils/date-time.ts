/**
 * Converts date to date only string
 */
export function toDateOnly(date: Date) {
  return date.toISOString().split("T")[0];
}

/**
 * Converts a given date to a years ago
 * @param years The years that needs to be in the past
 * @returns
 */
export function getDateYearsAgo(years: number) {
  let date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split("T")[0];
}

/**
 * Converts a UNIX timestamp to a Date object
 * @param secs The number of total seconds according to the UNIX standard
 * @returns
 */
export function toDateTime(secs: number) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
