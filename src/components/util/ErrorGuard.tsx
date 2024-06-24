import { Barlow } from "next/font/google";
import React, { FormEventHandler } from "react";
import { ErrorFlySvg } from "../icons";
import Button from "../general/Button";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400"],
});

const ErrorGuard = ({
  isError,
  children,
  handleSubmit,
  isLoading,
}: {
  isError: boolean;
  children: React.ReactNode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}) => {
  return (
    <>
      {isError ? (
        <div
          className={`text-red-400 items-center  flex flex-col gap-5 w-full ${barlow.className}`}
        >
          <ErrorFlySvg />
          <p className="text-2xl">Uh oh!. Looks like something went wrong.</p>
          <form onSubmit={handleSubmit} className="w-1/2">
            <div className="flex fixed md:relative top-0 w-full left-0 p-5 md:p-0 bg-bg">
              <input
                name={"city"}
                placeholder="Check the weather for any country"
                className="bg-fade text-offWhite rounded-md rounded-r-none w-full p-3 outline-none border-none "
              />
              <Button isLoading={isLoading} text="GO" />
            </div>
          </form>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ErrorGuard;
