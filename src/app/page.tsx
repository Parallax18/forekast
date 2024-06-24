"use client";

import DayCard from "@/components/calender/DayCard";
import TodayCard from "@/components/calender/TodayCard";

import Sidebar from "@/components/layout/Sidebar";

import { FormEventHandler, useEffect, useState } from "react";

import { useGetForecast } from "@/api-services/weather/hooks";
import { getDayOfWeek } from "@/utils/get-day-of-week";

export default function Home() {
  const [city, setCity] = useState("Abuja");
  const {
    data: forecastData,
    error,
    isPending,
  } = useGetForecast({ city, days: "7" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.target);
    const _city = formData.get("city");
    console.log(city);
    e.preventDefault();
    setCity(_city as string);
  };
  useEffect(() => {
    console.log({ forecastData, error });
  }, [forecastData, error]);

  return (
    <main className="h-screen flex p-3 relative">
      <Sidebar
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
      <section className="p-5 pl-[30%] space-y-10">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              name={"city"}
              placeholder="Check the weather for any country"
              className="bg-slate-200 rounded-md rounded-r-none w-full p-3 outline-none border-none"
            />
            <button type="submit" className="p-3 w-16 bg-green-700 text-white">
              Go
            </button>
          </div>
        </form>
        <div>
          <p
            className={` text-xl mb-4 text-[#e1e1e1] border-b border-[#e1e1e1] pb-1`}
          >
            This Week&apos;s forecast
          </p>
          <div className="flex gap-2">
            {forecastData?.forecast?.forecastday?.map((data) => (
              <DayCard
                key={data?.date_epoch}
                day={getDayOfWeek(data?.date, { shorten: true })}
                tempC={data?.day.avgtemp_c.toLocaleString()}
                image={data?.day.condition?.icon}
              />
            ))}
          </div>
        </div>
        <section>
          <p
            className={` text-xl mb-4  text-[#e1e1e1] border-b border-[#e1e1e1] pb-1`}
          >
            Today&apos;s Highlights
          </p>
          <div className="grid grid-cols-2 gap-4">
            <TodayCard
              title={"Wind Speed"}
              value={String(forecastData?.current?.wind_kph)}
            />
            <TodayCard
              title={"Humidity"}
              value={String(forecastData?.current?.humidity)}
            />
            <TodayCard
              title={"Pressure"}
              value={String(forecastData?.current?.pressure_in)}
            />
            <TodayCard
              title={"Description"}
              value={String(forecastData?.current?.condition.text)}
            />
          </div>
        </section>
      </section>
    </main>
  );
}
