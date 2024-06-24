"use client";

import DayCard from "@/components/calender/DayCard";
import TodayCard from "@/components/calender/TodayCard";

import Sidebar from "@/components/layout/Sidebar";

import { FormEventHandler, useState } from "react";

import { useGetForecast } from "@/api-services/weather/hooks";
import { getDayOfWeek } from "@/utils/get-day-of-week";
import Button from "@/components/general/Button";
import ErrorGuard from "@/components/util/ErrorGuard";

export default function Home() {
  const [city, setCity] = useState("Abuja");
  const [fieldError, setFieldError] = useState({ isValid: true, message: "" });
  const {
    data: forecastData,

    isError,
    isLoading,
  } = useGetForecast({ city, days: "7" });

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

  return (
    <main className="h-screen flex flex-col md:flex-row p-3 relative w-full">
      <ErrorGuard
        isError={isError || (!forecastData && !isLoading)}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      >
        <>
          <Sidebar
            isLoading={isLoading}
            tempC={String(forecastData?.current?.temp_c)}
            day={getDayOfWeek(String(forecastData?.current?.last_updated))}
            time={forecastData?.current?.last_updated.split(" ")[1] as string}
            location={{
              city: String(forecastData?.location.name),
              country: String(forecastData?.location.country),
            }}
            isDay={forecastData?.current.is_day as number}
            image={String(forecastData?.current.condition.icon)}
          />
          <section className="md:p-5 md:pl-[30%] space-y-10 w-full">
            <form onSubmit={handleSubmit}>
              <div className=" fixed md:relative top-0 w-full left-0 p-5 md:p-0 bg-bg">
                <div className="flex w-full">
                  <input
                    name={"city"}
                    placeholder="Check the weather for any country"
                    className="bg-fade text-offWhite rounded-md rounded-r-none w-full p-3 outline-none border-none"
                  />
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
                  {forecastData?.forecast?.forecastday?.map((data) => (
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
                    value={String(forecastData?.current?.wind_kph)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Humidity"}
                    value={String(forecastData?.current?.humidity)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Pressure"}
                    value={String(forecastData?.current?.pressure_in)}
                    isLoading={isLoading}
                  />
                  <TodayCard
                    title={"Description"}
                    value={String(forecastData?.current?.condition.text)}
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
