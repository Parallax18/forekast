import { useMutation, useQuery } from "@tanstack/react-query";

import { QueryKeys } from "../constants";
import { getForecast } from "./actions";
// import { getForecast } from "@/app/actions";

export const useGetForecast = () => {
  return useMutation({
    mutationFn: (params: ForecastRequestParams) => getForecast(params),
    mutationKey: QueryKeys.FORECAST,
  });
};
