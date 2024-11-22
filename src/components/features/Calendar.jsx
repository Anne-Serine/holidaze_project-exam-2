import { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../common/Buttons";
import { useBookings } from "../../hooks/Store";


function Calendar({venueData, venueId }) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const createBooking = useBookings((state) => state.createBooking);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const bookedDates = venueData.bookings.map(booking => ({
    start: booking.dateFrom,
    end: booking.dateTo
  }));

  console.log(createBooking)
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
      <div>
            <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} max={venueData.maxGuests} min="1" />
            <Button text="Book" onClick={() => createBooking( startDate, endDate, guests, venueId )} />
          </div>
    </>
  );
};

export default Calendar;