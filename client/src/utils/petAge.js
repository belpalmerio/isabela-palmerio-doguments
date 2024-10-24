import { differenceInMonths } from "date-fns";
import formatDate from "./formatDate.js";

const petAge = (dob) => {
  const today = new Date();

  const monthsAge = differenceInMonths(today, dob);

  const years = parseInt(monthsAge / 12);
  const months = monthsAge % 12;

  if (years === 1 && months === 1) {
    return [years + " " + "year" + ",", " " + months + " " + "months"];
  } else if (years === 1) {
    return [years + " " + "year" + ",", " " + months + " " + "months"];
  } else if (months === 1) {
    return [years + " " + "years" + ",", " " + months + " " + "month"];
  } else if (years === 0) {
    return [months + " " + "months"];
  } else if (months === 0) {
    return [years + " " + "years"];
  }

  return [years + " " + "years" + ",", " " + months + " " + "months"];
};

export default petAge;
