"use server";

export async function getForecast(params: ForecastRequestParams) {
  const { city, days } = params;
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=${days}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  return result;
}
