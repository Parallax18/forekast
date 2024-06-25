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
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fieldError, setFieldError] = useState({ isValid: true, message: "" });
  const handleFormatDate = (date: string | number | Date | undefined) => {
    return date
      ? format(new Date(date!), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
  };
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
    error: futureForecastError,
    isError: isFutureForecastError,
    isLoading: loadingFutureForecast,
  } = useGetFutureForecast({
    city,
    date: !checkDateIsWithin14Days(selectedDate)
      ? handleFormatDate(selectedDate)
      : undefined,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    // @ts-expect-error -
    const formData = new FormData(e.target);
    e.preventDefault();
    const _city = formData.get("city");

    // Simplified error handling. Complex applications can use tools like RHF, FORMIK, ZOD, YUP ...
    if ((_city as string)?.length === 0) {
      setFieldError({ isValid: false, message: "Please enter a city" });
    } else {
      setFieldError({ isValid: true, message: "" });
      setCity(_city as string);
    }
  };

  useEffect(() => {
    console.log(futureForecastData, futureForecastError);
  }, [futureForecastData, futureForecastError]);

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
            country: String(forecastData?.location.name),
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
        handleSubmit={handleSubmit}
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
            <form onSubmit={handleSubmit}>
              <div className=" fixed md:relative top-0 w-full left-0 p-5 md:p-0 bg-bg">
                <div className="flex w-full  bg-fade rounded-md ">
                  <input
                    name={"city"}
                    placeholder="City name"
                    className=" text-offWhite bg-transparent rounded-r-none w-[70%] p-3 outline-none border-none"
                  />
                  <div className="w-[30%] flex items-center justify-center border-l  border-l-bg relative">
                    <div
                      className="bg-fade w-full flex justify-center items-center cursor-pointer"
                      onClick={() => setCalenderIsOpen(!calenderIsOpen)}
                    >
                      <p className="text-slate-400 cursor-pointer">
                        {handleFormatDate(selectedDate)}
                      </p>
                    </div>
                    <DatePicker
                      isOpen={calenderIsOpen}
                      onClose={() => setCalenderIsOpen(false)}
                      onSelect={setSelectedDate}
                      selectedDate={selectedDate}
                    />
                  </div>
                  <Button isLoading={isLoading} text="GO" />
                </div>
                <p className="text-red-400">{fieldError.message}</p>
              </div>
            </form>

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
