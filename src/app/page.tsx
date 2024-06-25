"use client";

import DayCard from "@/components/calender/DayCard";
import TodayCard from "@/components/calender/TodayCard";

import Sidebar from "@/components/layout/Sidebar";

import { FormEventHandler, useEffect, useMemo, useState } from "react";

import {
  useGetForecast,
  useGetFutureForecast,
} from "@/api-services/weather/hooks";
import { getDayOfWeek } from "@/utils/get-day-of-week";
import Button from "@/components/general/Button";
import ErrorGuard from "@/components/util/ErrorGuard";
import DatePicker from "@/components/general/DatePicker";
import { differenceInDays, format } from "date-fns";
import SearchForm from "@/components/dashboard/SearchForm";
import { handleFormatDate } from "@/utils/format-date";

interface ForecastData {
  tempC: string;
  day: string;
  time: string;
  location: {
    city: string;
    country: string;
  };
  isDay: number;
  forecastday: Forecastday[];
  wind_kph: number;
  humidity: number;
  pressure: number;
  description: string;
}

interface ForecastMappedData {
  data: ForecastData;
  isError: boolean;
  isLoading: boolean;
}

export default function Home() {
  const today = new Date();
  const [city, setCity] = useState("Abuja");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const checkDateIsWithin14Days = (date: Date) => {
    const isWithin14Days = differenceInDays(date, today) <= 14;
    return isWithin14Days;
  };

  const {
    data: forecastData,
    isError: isForecastError,
    isLoading: loadingForecast,
  } = useGetForecast({
    city,
    days: "7",
    date: checkDateIsWithin14Days(selectedDate)
      ? handleFormatDate(selectedDate)
      : undefined,
  });
  const {
    data: futureForecastData,
    isError: isFutureForecastError,
    isLoading: loadingFutureForecast,
  } = useGetFutureForecast({
    city,
    date: !checkDateIsWithin14Days(selectedDate)
      ? handleFormatDate(selectedDate)
      : undefined,
  });
  interface Form {
    city: string;
  }
  const onSubmit = (values: Form) => {
    setCity(values.city);
  };

  const mapStates = (): ForecastMappedData => {
    const isWithin14Days = checkDateIsWithin14Days(selectedDate);
    if (isWithin14Days) {
      return {
        data: {
          tempC: String(forecastData?.current?.temp_c),
          day: getDayOfWeek(String(forecastData?.current?.last_updated)),
          time: forecastData?.current?.last_updated.split(" ")[1] as string,
          location: {
            city: String(forecastData?.location.name),
            country: String(forecastData?.location.country),
          },
          isDay: forecastData?.current.is_day as number,
          forecastday: forecastData?.forecast?.forecastday as Forecastday[],
          wind_kph: forecastData?.current?.wind_kph as number,
          humidity: forecastData?.current?.humidity as number,
          pressure: forecastData?.current?.pressure_in as number,
          description: forecastData?.current?.condition.text as string,
        },
        isError: isForecastError,
        isLoading: loadingForecast,
      };
    } else {
      return {
        data: {
          tempC: String(
            futureForecastData?.forecast?.forecastday[0].day.avgtemp_c
          ),
          day: getDayOfWeek(
            String(futureForecastData?.forecast.forecastday[0].date)
          ),
          time: futureForecastData?.forecast.forecastday[0].hour[0].time.split(
            " "
          )[1] as string,
          location: {
            city: String(futureForecastData?.location.name),
            country: String(futureForecastData?.location.country),
          },
          isDay: futureForecastData?.forecast.forecastday[0].hour[0]
            .is_day as number,
          forecastday: futureForecastData?.forecast
            ?.forecastday as Forecastday[],
          wind_kph: futureForecastData?.forecast.forecastday[0].hour[0]
            .wind_kph as number,
          humidity: futureForecastData?.forecast.forecastday[0].hour[0]
            .humidity as number,
          pressure: futureForecastData?.forecast.forecastday[0].hour[0]
            .pressure_in as number,
          description: futureForecastData?.forecast.forecastday[0].hour[0]
            .condition.text as string,
        },
        isError: isFutureForecastError,
        isLoading: loadingFutureForecast,
      };
    }
  };

  const { data, isLoading, isError } = useMemo(() => {
    return mapStates();
  }, [
    selectedDate,
    forecastData,
    isForecastError,
    loadingForecast,
    futureForecastData,
    isFutureForecastError,
    loadingFutureForecast,
  ]);

  return (
    <main className="h-screen flex flex-col md:flex-row p-3 relative w-full">
      <ErrorGuard
        isError={isError || (!data && !isLoading)}
        isLoading={isLoading}
        onSubmit={onSubmit}
        handleDate={{ selectedDate, setSelectedDate }}
      >
        <>
          <Sidebar
            isLoading={isLoading}
            tempC={data?.tempC}
            day={data?.day}
            time={data?.time}
            location={data?.location}
            isDay={data?.isDay}
          />
          <section className="md:p-5 md:pl-[30%] space-y-10 w-full">
            <SearchForm
              isLoading={isLoading}
              onSubmit={onSubmit}
              handleDate={{ selectedDate, setSelectedDate }}
            />

            <>
              <div>
                <p
                  className={` text-xl mb-4 text-offWhite border-b border-fade pb-1`}
                >
                  This Week&apos;s forecast
                </p>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {data?.forecastday?.map((data) => (
                    <DayCard
                      key={data?.date_epoch}
                      day={getDayOfWeek(data?.date, { shorten: true })}
                      tempC={data?.day.avgtemp_c.toLocaleString()}
                      image={data?.day.condition?.icon}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              </div>
              <section className="  w-full">
                <p
                  className={` text-xl mb-4 w-full text-offWhite border-b border-fade pb-1`}
                >
                  Today&apos;s Highlights
                </p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <TodayCard
                    title={"Wind Speed"}
                    value={String(data?.wind_kph)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Humidity"}
                    value={String(data?.humidity)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Pressure"}
                    value={String(data?.pressure)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Description"}
                    value={String(data?.description)}
                    isLoading={isLoading}
                  />
                </div>
              </section>
            </>
          </section>
        </>
      </ErrorGuard>
    </main>
  );
}
