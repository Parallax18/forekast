import { Barlow } from "next/font/google";
import React from "react";
import Card from "../general/Card";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700"],
});

const TodayCard = () => {
  return (
    <Card>
      <div className="flex  flex-col gap-8">
        <p className={`flex gap-1 items-center text-2xl  text-gray-500`}>
          Wind Status
        </p>
        <p className="text-7xl font-normal text-white ">
          12&deg;<sup>c</sup>
        </p>
      </div>
    </Card>
  );
};

export default TodayCard;
