import { useMutation, useQuery } from "@tanstack/react-query";

import { QueryKeys } from "../constants";
import { getForecast } from "./actions";

export const useGetForecast = (params: ForecastRequestParams) => {
  return useQuery({
    queryFn: async () => await getForecast(params),
    queryKey: QueryKeys.FORECAST([params.city, params.days]),
    enabled: !!params.city && !!params.days,
  });
};