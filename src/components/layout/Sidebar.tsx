import React from "react";
import {
  MapPinIcon,
  PartlyCloudyDayIcon,
  PartlyCloudyNightIcon,
} from "../icons";
import { Barlow } from "next/font/google";
import Card from "../general/Card";
import Image from "next/image";

const nightSky =
  "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
const daySky =
  "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700"],
});

const Sidebar = () => {
  return (
    <section className="py-5 h-full w-[25%] fixed top-0">
      <Card>
        <div className="flex flex-col items-center pb-10 ">
          <PartlyCloudyNightIcon />
          {/* <PartlyCloudyDayIcon /> */}
          <div className="flex flex-col gap-6 w-full">
            <p className="text-9xl font-normal text-white ">
              12&deg;<sup>c</sup>
            </p>
            <p className="flex gap-1 items-center text-xl">
              <span className={`${barlow.className} font-bold text-white`}>
                Monday,
              </span>
              <span className="text-skyBlue">19:00</span>
            </p>
          </div>
        </div>
        <div className="relative h-52 w-full ">
          <Image fill className="object-cover rounded-md" src={daySky} alt="" />
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-gray-800/20">
            <p
              className={`${barlow.className} text-2xl text-white  p-1 flex items-center`}
            >
              <span>
                <MapPinIcon />
              </span>
              Abuja, Nigeria
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Sidebar;
