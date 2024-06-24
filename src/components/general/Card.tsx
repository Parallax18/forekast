import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-full p-5 flex flex-col justify-between rounded-xl">
      {children}
    </div>
  );
};

export default Card;
