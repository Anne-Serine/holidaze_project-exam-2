import { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../common/Buttons";
import { useAuthStore, useBookings } from "../../hooks/Store";
import { Link, useLocation } from "react-router-dom";

function Calendar({ venueData, venueId }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const createBooking = useBookings((state) => state.createBooking);
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const bookedDates = venueData.bookings.map((booking) => ({
    start: booking.dateFrom,
    end: booking.dateTo,
  }));

  const confirmBooking = () => {
    if (startDate && endDate && guests > 0) {
      createBooking(startDate, endDate, guests, venueId);
      setSuccessMessage("Booking successful!"); // Show success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after 3 seconds
      }, 3000);
    } else {
      setSuccessMessage("Please select valid dates and guests!"); // Error message
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
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
        excludeDateIntervals={bookedDates}
        calendarStartDay={1}
        minDate={new Date()}
        calendarClassName="max-h-max max-w-max"
      />
      {location.pathname.includes("/venue/") ? (
        token ? (
          <>
            <div className="flex gap-5">
              <label className="flex flex-1 flex-col gap-2">
                Guests (max {venueData.maxGuests})
                <input
                  type="number"
                  value={guests}
                  className="px-5"
                  onChange={(e) => setGuests(e.target.value)}
                  max={venueData.maxGuests}
                  min="1"
                />
              </label>
              <Button text="Book" onClick={confirmBooking} />
            </div>
            <div>
              {successMessage && (
                <p className="text-green-700">{successMessage}</p>
              )}
            </div>
          </>
        ) : (
          <div>
            You have to{" "}
            <Link
              to={`/login?venueId=${venueId}`}
              className="italic text-daze-accent underline"
            >
              login
            </Link>{" "}
            to create a booking
          </div>
        )
      ) : null}
    </>
  );
}

export default Calendar;
