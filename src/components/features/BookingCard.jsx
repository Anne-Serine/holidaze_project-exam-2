import { Info, Trash, Users } from "lucide-react";

function BookingCard({ booking, venueName, venueImage, rating, type = "light", ownBooking = true, openModal }) {
  const dateFrom = booking?.dateFrom
    ? new Date(booking.dateFrom).toLocaleDateString()
    : "No Date Available";

  const dateTo = booking?.dateTo
    ? new Date(booking.dateTo).toLocaleDateString()
    : "No Date Available";

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

  const handleDelete = () => {
    return openModal(booking.id, venueName, "booking")
  };

  return (
    <div className={`p-2 ${style[type]} flex flex-wrap gap-2`}>
      <div className="size-24">
        <img
          src={venueImage}
          alt=""
          className="object-cover h-full w-full outline outline-daze-white outline-1 -outline-offset-[5px]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2 min-w-[18rem]">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-2xl font-['Cormorant_Garamond'] uppercase">
              {venueName || "Unknown Venue"}
              </span>
              <span className="flex items-center gap-1 text-sm"><img src="/assets/star.svg" alt="" />{rating}</span>
            </div>
            {ownBooking ? (
              <button title="delete booking">
                <Trash color="#8B0404" size={20} onClick={handleDelete} />
              </button>
            ) : (
              <button title={`Customer: ${booking.customer.name}`}>
                <Info color="#C78D70" size={20} onClick={null} />
              </button>
            )
            }
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
    </div>
  );
}

export default BookingCard;
