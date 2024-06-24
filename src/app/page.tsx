"use client";

import DayCard from "@/components/calender/DayCard";
import TodayCard from "@/components/calender/TodayCard";
import { PartlyCloudyNightIcon } from "@/components/icons";
import Sidebar from "@/components/layout/Sidebar";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetForecast } from "@/api-services/weather/hooks";

export default function Home() {
  const {
    mutate: getForecastData,
    data: forecastData,
    error,
    isPending,
  } = useGetForecast();

  // const { data: forecastData, isLoading } = useGetWeatherForecast({
  //   days: "7",
  //   city,
  // });
  // const { data: forecastData, isLoading } = useQuery(
  //   getForecast({ city, days: 7 })
  // );

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const city = formData.get("city");
    console.log(city);
    e.preventDefault();
    getForecastData({ city, days: "7" });
  };
  useEffect(() => {
    console.log({ forecastData, error });
  }, [forecastData, error]);

  return (
    <main className="h-screen flex p-3 relative">
      <Sidebar />
      <section className="p-5 pl-[30%] space-y-10">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name={"city"}
              placeholder="Check the weather for any country"
              className="bg-slate-200 rounded-md w-full p-3 outline-none border-none"
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
            {/* {forecastData?.} */}
            <DayCard />
            <DayCard />
            <DayCard />
            <DayCard />
            <DayCard />
            <DayCard />
            <DayCard />
          </div>
        </div>
        <section>
          <p
            className={` text-xl mb-4  text-[#e1e1e1] border-b border-[#e1e1e1] pb-1`}
          >
            Today&apos;s Highlights
          </p>
          <div className="grid grid-cols-2 gap-4">
            <TodayCard />
            <TodayCard />
            <TodayCard />
            <TodayCard />
          </div>
        </section>
      </section>
    </main>
  );
}
