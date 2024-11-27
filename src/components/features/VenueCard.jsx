import { ParkingCircle, PawPrint, Utensils, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

function VenueCard({ image, name, price, rating, id, meta }) {
  return (
    <Link
      to={`/venue/${id}`}
      className="block venue-card relative max-w-[26rem] w-full hover:scale-[101%] transition"
    >
      <div className="relative h-[18rem] overflow-hidden justify-center items-center">
        {image && image.length &&
          <img
            src={image[0].url}
            alt=""
            className="object-cover w-full h-full"
          />
      
        }
        <div className="absolute inset-0 bg-daze-gray bg-opacity-70 max-w-[4rem]">

        {meta && 
          <div className="p-3 flex flex-col items-end justify-center h-full gap-3">
            <Utensils color={meta.breakfast ? "#FFFFFF" : "#737373"} />
            <Wifi color={meta.wifi ? "#FFFFFF" : "#737373"} />
            <ParkingCircle color={meta.parking ? "#FFFFFF" : "#737373"} />
            <PawPrint color={meta.pets ? "#FFFFFF" : "#737373"} />
          </div>
        }


          {/* <div className="p-2 flex flex-col items-end justify-center h-full gap-3">
            <WifiIcon color="white" size={20} />
            <ForkKnife color="white" size={20} />
            <ParkingCircle color="white" size={20} />
            <PawPrint color="white" size={20} />
          </div> */}
        </div>
      </div>
      <div className="bg-daze-gray text-daze-white p-6 px-8 font-light">
        <h3 className="truncate max-w-[15rem]" title="{}">
          {name}
        </h3>
        <div className="flex justify-between items-center py-1">
          <p className="">{price} NOK / Night</p>
          {rating ? (
            <p className="flex gap-1 text-daze-accent items-center">
              <img
                src="/assets/star.svg"
                alt="Star icon"
                className="size-5"
              />
              {rating}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
