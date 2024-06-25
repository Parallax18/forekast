/* eslint-disable import/no-cycle */
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addDays, format } from "date-fns";
import React, { useState } from "react";

import { Calendar } from "react-date-range";

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedDate: Date;
}

const DatePicker = (props: DatePickerProps) => {
  const { isOpen, onClose, onSelect, selectedDate } = props;
  const today = new Date();
  const maxDate = addDays(today, 300);

  return (
    <>
      {isOpen ? (
        <div className="absolute w-full md:-ml-12 md:left-0 right-48 top-10 z-50">
          <Calendar
            date={selectedDate}
            onChange={onSelect}
            color="#2563eb"
            calendarFocus="backwards"
            minDate={today}
            maxDate={maxDate}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DatePicker;
