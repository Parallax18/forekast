export function getDayOfWeek(
  dateString: string,
  options: { shorten?: boolean; shortenTo?: number } = {}
): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { shorten, shortenTo } = options;
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  const dayName = daysOfWeek[dayIndex];

  return shorten ? dayName.slice(0, shortenTo || 3) : dayName;
}
