import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { QueryKeys } from "../constants";
import { getForecast, getFutureForecast } from "./actions";

export const useGetForecast = (params: ForecastRequestParams) => {
  return useQuery({
    queryFn: async () => await getForecast(params),
    queryKey: QueryKeys.FORECAST([
      params.city,
      params.days,
      params.date as string,
    ]),
    enabled: !!params.city && !!params.days && !!params.date,
  });
};

export const useGetFutureForecast = (params: FutureForecastRequestParams) => {
  return useQuery({
    queryFn: async () => await getFutureForecast(params),
    queryKey: QueryKeys.FUTURE_FORECAST([params.city, params.date as string]),
    enabled: !!params.city && !!params.date,
  });
};
