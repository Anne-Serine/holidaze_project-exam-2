import { Users } from "lucide-react";
import { Link } from "react-router-dom";

function BookingCard({ type = "light" }) {
  const style = {
    light: "bg-daze-white ",
    dark: "bg-daze-gray text-daze-white",
  };
  return (
    <Link to="" className={`p-2 ${style[type]} flex flex-wrap gap-2`}>
      <div className="size-24">
        <img
          src="/assets/hero-img.jpg"
          alt=""
          className="object-cover h-full w-full outline outline-daze-white outline-1 -outline-offset-[5px]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2 min-w-[18rem]">
        <div>
          <div className="flex gap-2">
            <span className="text-2xl font-['Cormorant_Garamond'] uppercase">
              Cabin in the woods
            </span>
            <span className="flex items-center gap-1 text-sm"><img src="/assets/star.svg" alt="" />4.8</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span>10. november - 15.november</span>
            &bull;
            <span>5 days</span>
          </div>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          <span>In 7 days</span>
          <span className="flex gap-1 items-center"><Users size={16} /> 2 guests</span>
        </div>
      </div>
    </Link>
  );
}

export default BookingCard;
