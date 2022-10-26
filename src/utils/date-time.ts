export function toDateOnly(date: Date) {
  return date.toISOString().split("T")[0];
}

export function getDateYearsAgo(years: number) {
  let date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split("T")[0];
}
