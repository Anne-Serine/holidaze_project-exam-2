import { useState } from "react";
import DatePicker from "react-datepicker";

function Calendar() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />

    </>
  );
};

export default Calendar;