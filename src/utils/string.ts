export function capitalizeFirstLetter(input: string) {
  const capitalizedFirstLetter = input.slice(0, 1).toUpperCase();
  const rest = input.slice(1);
  return `${capitalizedFirstLetter}${rest}`;
}
