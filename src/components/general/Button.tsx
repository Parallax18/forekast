import React from "react";
import Spinner from "./Spinner";

interface ButtonProps {
  isLoading: boolean;
  text: string;
}

const Button = (props: ButtonProps) => {
  const { isLoading, text } = props;
  return (
    <button
      type="submit"
      className="p-3 w-16 bg-blue-600 rounded-r-md text-white flex justify-center items-center"
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
