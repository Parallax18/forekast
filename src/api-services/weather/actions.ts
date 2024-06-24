"use server";

import { QueryKeys } from "../constants";
import { HttpClient } from "../http";

const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
export async function getForecast(params: ForecastRequestParams) {
  try {
    return await HttpClient.get<ForecastResponse>({
      url: "forecast.json",
      params: { q: params.city, days: params.days, key },
    });
  } catch (err) {
    console.error("Error fetching forecast:", err);
    console.log(err);
  }
}

export async function getCurrentDayWeatherDetails(
  params: WeatherRequestBaseParams
) {
  return {
    queryKey: QueryKeys.CURRENT,
    queryFn: async () => {
      try {
        return await HttpClient.get<CurrentDayWeatherDetailsResponse>({
          url: "/current.json",
          params: { q: params.city, key },
        });
      } catch (err) {
        console.error("Error fetching current day weather details:", err);
        throw err;
      }
    },
    enabled: !!params.city,
  };
}
