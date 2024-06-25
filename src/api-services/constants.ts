export const QueryKeys = {
  FORECAST: (params: string[]) => ["get-forecast", ...params],
  FUTURE_FORECAST: (params: string[]) => ["get-future-forecast", ...params],
  CURRENT: ["get-current"],
};
