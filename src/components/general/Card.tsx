import React from "react";

const Card = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={`${
        isLoading ? "bg-border" : ""
      } w-full h-full p-5 flex flex-col justify-between rounded-xl`}
    >
      {!isLoading ? children : null}
    </div>
  );
};

export default Card;
