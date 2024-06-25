"use server";

import { HttpClient } from "../http";

const key = process.env.NEXT_PUBLIC_WEATHER_API;
export async function getForecast(params: ForecastRequestParams) {
  try {
    return await HttpClient.get<ForecastResponse>({
      url: "forecast.json",
      params: { q: params.city, days: params.days, key },
    });
  } catch (err) {
    console.error("Error fetching forecast:", err);

    throw err;
  }
}
export async function getFutureForecast(params: FutureForecastRequestParams) {
  try {
    return await HttpClient.get<FutureForecastResponse>({
      url: "future.json",
      params: { q: params.city, dt: params.date, key },
    });
  } catch (err) {
    console.error("Error fetching forecast:", err);

    throw err;
  }
}
