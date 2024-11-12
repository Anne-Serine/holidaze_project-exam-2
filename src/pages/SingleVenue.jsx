import {
  ParkingCircle,
  PawPrint,
  Pen,
  Trash,
  Utensils,
  Wifi,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Calendar from "../components/features/Calendar";
import Button from "../components/common/Buttons";

function SingleVenue() {
  return (
    <div>
      <div className="bg-daze-primary-op10">
        <div className="container flex justify-end gap-10">
          <button className="flex gap-2 items-center">
            <Pen />
            <p>Edit venue</p>
          </button>
          <button className="flex gap-2">
            <Trash color="#8B0404" />
            <p className="text-daze-red">Edit venue</p>
          </button>
        </div>
      </div>
      <section className="container">
        Image carousel
        {/* Image carousel */}
      </section>
      <div className="bg-daze-white flex justify-center gap-5 py-2">
        <ul className="container flex justify-center gap-10 font-medium text-sm ">
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              OVERVIEW
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              DESCRIPTION
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              FACILITIES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-daze-accent"
                  : "hover:border-b hover:border-daze-accent"
              }
            >
              POLICIES
            </NavLink>
          </li>
        </ul>
      </div>
      <section className="container grid cards-grid">
        <div className="w-full">
          <h1>Venue name</h1>
          <p>rating</p>
          <div>
            <img src="" alt="" />
            <p>Profile name of the creator</p>
          </div>
          <div className="flex justify-between">
            <div>Created: Date</div>
            <div>Updated: Date</div>
          </div>
          <div>Description</div>
          <div>Price NOK / Night</div>
        </div>
        <div className="cards-grid">
          <Calendar />
          <Button text="Book" />
        </div>
      </section>
      <div className="bg-daze-gray py-2 text-daze-white">
        <div className="container flex justify-center gap-10">
          <button className="flex flex-col items-center">
            <Utensils color="#FFFFFF" />
            Breakfast
          </button>
          <button className="flex flex-col items-center">
            <Wifi color="#FFFFFF" />
            Wifi
          </button>
          <button className="flex flex-col items-center">
            <ParkingCircle color="#FFFFFF" />
            Parking
          </button>
          <button className="flex flex-col items-center">
            <PawPrint color="#FFFFFF" />
            Pets
          </button>
        </div>
      </div>
      <div className="text-center p-5">LOCATION</div>
    </div>
  );
}

export default SingleVenue;
