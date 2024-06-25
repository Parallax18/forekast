import { Barlow } from "next/font/google";
import React, { FormEventHandler } from "react";
import { ErrorFlySvg } from "../icons";
import Button from "../general/Button";
import SearchForm, { SearchFormProps } from "../dashboard/SearchForm";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400"],
});

const ErrorGuard = <T extends Record<string, any>>({
  isError,
  children,
  onSubmit,
  isLoading,
  handleDate,
}: {
  isError: boolean;
  children: React.ReactNode;
} & SearchFormProps<T>) => {
  return (
    <>
      {isError ? (
        <div
          className={`text-red-400 items-center  flex flex-col gap-5 w-full ${barlow.className}`}
        >
          <ErrorFlySvg />
          <p className="text-2xl">Uh oh!. Looks like something went wrong.</p>
          <SearchForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            handleDate={handleDate}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ErrorGuard;
