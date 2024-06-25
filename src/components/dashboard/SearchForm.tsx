import { handleFormatDate } from "@/utils/format-date";
import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "../general/DatePicker";
import Button from "../general/Button";
import { useForm } from "@/utils/use-form";

export interface SearchFormProps<T> {
  onSubmit: (values: T) => void;
  isLoading: boolean;
  handleDate: {
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
  };
}

const SearchForm = <T extends Record<string, any>>(
  props: SearchFormProps<T>
) => {
  const {
    onSubmit,
    isLoading,
    handleDate: { selectedDate, setSelectedDate },
  } = props;
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  const { formState, register, handleSubmit } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" fixed md:relative top-0 w-full left-0 p-5 md:p-0 bg-bg z-50">
        <div className="flex w-full  bg-fade rounded-md ">
          <input
            name={"city"}
            placeholder="City name"
            {...register("city")}
            className=" text-offWhite bg-transparent rounded-r-none w-[70%] p-3 outline-none border-none"
          />
          <div className="w-[30%] flex items-center justify-center border-l  border-l-bg relative">
            <div
              className="bg-fade w-full flex justify-center items-center cursor-pointer px-1"
              onClick={() => setCalenderIsOpen(!calenderIsOpen)}
            >
              <p className="text-slate-400 cursor-pointer whitespace-nowrap">
                {handleFormatDate(selectedDate)}
              </p>
            </div>
            <DatePicker
              isOpen={calenderIsOpen}
              onClose={() => setCalenderIsOpen(false)}
              onSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>
          <Button isLoading={isLoading} text="GO" />
        </div>
        {!formState.isValid && (
          <p className="text-red-400">{formState.message}</p>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
