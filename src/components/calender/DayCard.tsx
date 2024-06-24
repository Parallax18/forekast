import React from "react";
import { PartlyCloudyDayIcon } from "../icons";
import { Barlow } from "next/font/google";
import Card from "../general/Card";
import Image from "next/image";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700"],
});

interface DayCardProps {
  day: string;
  tempC: string;
  image: string;
}

const DayCard = (props: DayCardProps) => {
  const { day, tempC, image } = props;
  return (
    <Card>
      <div className="flex  items-center flex-col gap-8">
        <Image width={64} height={64} src={`https:${image}`} alt="" />
        <div>
          <p
            className={`flex gap-1 items-center text-2xl ${barlow.className} font-bold text-white`}
          >
            {tempC}&deg;<sup>c</sup>
          </p>
          <p className="text-xl font-normal text-white ">
            {day?.toUpperCase()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DayCard;
