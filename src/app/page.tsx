import DayCard from "@/components/calender/DayCard";
import TodayCard from "@/components/calender/TodayCard";
import { PartlyCloudyNightIcon } from "@/components/icons";
import Sidebar from "@/components/layout/Sidebar";
import { Barlow } from "next/font/google";
import Image from "next/image";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <main className="h-screen flex p-3 relative">
      <Sidebar />
      <section className="p-5 pl-[30%] space-y-10">
        <section>
          <div>
            <input
              placeholder="Check the weather for any country"
              className="bg-slate-200 rounded-md w-full p-3 outline-none border-none"
            />
          </div>
        </section>
        <div>
          <p
            className={` text-xl mb-4 text-[#e1e1e1] border-b border-[#e1e1e1] pb-1`}
          >
            This Week&apos;s forecast
          </p>
          <div className="flex gap-2">
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
