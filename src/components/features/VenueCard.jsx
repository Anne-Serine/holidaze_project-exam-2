import { ForkKnife, ParkingCircle, PawPrint, WifiIcon } from "lucide-react";
import { Link } from "react-router-dom";

function VenueCard() {
  return (
    <Link to="#" className="venue-card relative max-w-[30rem] hover:scale-[101%] transition">
      <div className="relative">
        <img
          src="/assets/hero-img.jpg"
          alt=""
          className="object-cover overflow-hidden"
        />
        <div className="absolute inset-0 bg-daze-gray bg-opacity-70 max-w-[4rem]">
          <div className="p-2 flex flex-col items-end justify-center h-full gap-3">
            <WifiIcon color="white" size={20} />
            <ForkKnife color="white" size={20} />
            <ParkingCircle color="white" size={20} />
            <PawPrint color="white" size={20} />
          </div>
        </div>
      </div>
      <div className="bg-daze-gray text-daze-white p-6 px-8 font-light">
        <h3 className="truncate" title="{}">
          Venue Name
        </h3>
        <div className="flex justify-between items-center py-1">
          <p className="">*Pris* NOK / Night</p>
          <p className="flex gap-1 text-daze-accent items-center">
            <img
              src="/assets/star.svg"
              alt="Star icon"
              className="size-5"
            />
            4.8
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
