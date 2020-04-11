export function format(date) {
  const dateToFormat = new Date(date);
  const year = dateToFormat.getFullYear();
  const day = dateToFormat.getDate();

  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(dateToFormat);

  return `${month} ${day}, ${year}`;
}