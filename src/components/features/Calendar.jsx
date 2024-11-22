import { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../common/Buttons";
import { useAuthStore, useBookings } from "../../hooks/Store";
import { Link } from "react-router-dom";


function Calendar({venueData, venueId}) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const createBooking = useBookings((state) => state.createBooking);
  const token = useAuthStore((state) => state.token)

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
  console.log(token)
  
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
      {token ? (
        <div className="flex gap-5">
          <label className="flex flex-1 flex-col gap-2">How many guests are you?
            <input type="number" value={guests} className="px-5" onChange={(e) => setGuests(e.target.value)} max={venueData.maxGuests} min="1" />
          </label>
          <Button text="Book" onClick={() => createBooking( startDate, endDate, guests, venueId )} />
        </div>
      ) : (
        <div>You have to <Link to="/login" className="italic text-daze-accent underline">login</Link> to create a booking</div>
      )}
    </>
  );
};

export default Calendar;