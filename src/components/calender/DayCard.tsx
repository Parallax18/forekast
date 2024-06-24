import React from "react";
import { PartlyCloudyDayIcon } from "../icons";
import { Barlow } from "next/font/google";
import Card from "../general/Card";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700"],
});

const DayCard = () => {
  return (
    <Card>
      <div className="flex  items-center flex-col gap-8">
        <PartlyCloudyDayIcon width={64} height={64} />

        <div>
          <p
            className={`flex gap-1 items-center text-2xl ${barlow.className} font-bold text-white`}
          >
            12&deg;<sup>c</sup>
          </p>
          <p className="text-xl font-normal text-white ">SUN</p>
        </div>
      </div>
    </Card>
  );
};

export default DayCard;
