import { Barlow } from "next/font/google";
import React from "react";
import Card from "../general/Card";

interface TodayCardProps {
  title: string;
  value: string;
}

const TodayCard = (props: TodayCardProps) => {
  const { title, value } = props;
  return (
    <Card>
      <div className="flex  flex-col gap-8">
        <p className={`flex gap-1 items-center text-2xl  text-gray-500`}>
          {title}
        </p>
        <p className="text-6xl font-normal text-white ">
          {/* 12&deg;<sup>c</sup> */}
          {value}
        </p>
      </div>
    </Card>
  );
};

export default TodayCard;
