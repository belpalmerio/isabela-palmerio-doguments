import { format } from "date-fns";

const formatDate = (data) => {
  return format(new Date(data), "yyyy-MM-dd");
};

export default formatDate;
