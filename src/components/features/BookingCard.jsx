import { Trash, Users } from "lucide-react";
import { Link } from "react-router-dom";
import useVenues, { useBookings } from "../../hooks/Store";

function BookingCard({ booking, type = "light" }) {
  const dateFrom = booking?.dateFrom
    ? new Date(booking.dateFrom).toLocaleDateString()
    : "No Date Available";

  const dateTo = booking?.dateTo
    ? new Date(booking.dateTo).toLocaleDateString()
    : "No Date Available";

  console.log(booking)
  const style = {
    light: "bg-daze-white ",
    dark: "bg-daze-gray text-daze-white",
  };

  const firstDate = new Date(booking?.dateFrom)
  const secondDate = new Date(booking?.dateTo)
  const dateToday = new Date()
  const firstDateInMs = firstDate.getTime()
  const secondDateInMs = secondDate.getTime()
  const dateTodayInMs = dateToday.getTime()
  const differenceBtwDates = secondDateInMs - firstDateInMs
  const differenceFromToday = secondDateInMs - dateTodayInMs
  const daysDiff = Math.round(differenceBtwDates / (24 * 60 * 60 * 1000))
  const daysUntilBooking = Math.round(differenceFromToday / (24 * 60 * 60 * 1000))

  const deleteBooking = useBookings((state) => state.deleteBooking);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this booking?`)) {
      console.log(booking.id)
      deleteBooking(booking.id);
    }
  };

  return (
    <Link to="" className={`p-2 ${style[type]} flex flex-wrap gap-2`}>
      <div className="size-24">
        <img
          src={booking.venueUrl}
          alt=""
          className="object-cover h-full w-full outline outline-daze-white outline-1 -outline-offset-[5px]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2 min-w-[18rem]">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-2xl font-['Cormorant_Garamond'] uppercase">
              {booking?.venueName || "Unknown Venue"}
              </span>
              <span className="flex items-center gap-1 text-sm"><img src="/assets/star.svg" alt="" />4.8</span>
            </div>
            <button><Trash color="#8B0404" size={20} onClick={handleDelete} /></button>
          </div>
          <div className="flex gap-2 text-sm">
            <span>{dateFrom} - {dateTo}</span>
            &bull;
            <span>{daysDiff} days</span>
          </div>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          <span>In {daysUntilBooking} days</span>
          <span className="flex gap-1 items-center"><Users size={16} />{booking?.guests}</span>
        </div>
      </div>
    </Link>
  );
}

export default BookingCard;
