export function capitalFirstLetter(s: string) {
  let s2 = [...s];
  s2[0] = s2[0].toUpperCase();
  return s2.join("");
}
