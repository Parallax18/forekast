import { format } from "date-fns";

export const handleFormatDate = (date: string | number | Date | undefined) => {
  return date
    ? format(new Date(date!), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");
};
