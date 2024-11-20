import { useState } from "react";
import DatePicker from "react-datepicker";


function Calendar({venueData}) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const bookedDates = venueData.bookings.map(booking => ({
    start: booking.dateFrom,
    end: booking.dateTo
  }));

  console.log("start:", startDate, "end:", endDate)
  console.log(venueData)
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        excludeDateIntervals={bookedDates}
      />
      
    </>
  );
};

export default Calendar;