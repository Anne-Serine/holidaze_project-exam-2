import { Camera, Pen, Trash } from "lucide-react";
import BookingCard from "../components/features/BookingCard";
import Calendar from "../components/features/Calendar";
import useVenues, { useAuthStore, useBookings } from "../hooks/Store";
import { useEffect, useRef, useState } from "react";
import Button from "../components/common/Buttons";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";
import VenueCard from "../components/features/VenueCard";
import Modal from "../components/common/Modal";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const getAllVenues = useVenues((state) => state.getAllVenues);
  const bookingsByProfile = useVenues((state) => state.bookingsByProfile);
  const updateProfile = useProfile((state) => state.updateProfile);
  const venuesByProfile = useVenues((state) => state.venuesByProfile);
  const [showBio, setShowBio] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar || { url: "", alt: "" });
  const error = useProfile((state) => state.error);

  const deleteVenue = useVenues((state) => state.deleteVenue);
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [venueNameToDelete, setVenueNameToDelete] = useState("");
  const deleteBooking = useBookings((state) => state.deleteBooking);
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    getAllVenues();
  }, [getAllVenues]);

  const dialogRef = useRef(null);

  const deleteFunctionRef = useRef(null);

  const openModal = (id, name, deleteType) => {
    setVenueToDelete(id);
    setVenueNameToDelete(name);
    if (deleteType === "venue") {
      deleteFunctionRef.current = () => deleteVenue(id); // Point to deleteVenue
    } else if (deleteType === "booking") {
      deleteFunctionRef.current = () => deleteBooking(id); // Point to deleteBooking
    }
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setVenueToDelete(null);
    setVenueNameToDelete("");
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const confirmDelete = () => {
    if (venueToDelete && deleteFunctionRef.current) {
      deleteFunctionRef.current(venueToDelete);
      setSuccessMessage(`You successfully deleted "${venueNameToDelete}"`)
      setTimeout(() => {
        closeModal();
        setSuccessMessage("");
      }, 3000)
      
    }
  };

  return (
    <div>
      <div className="relative bg-daze-gray md:h-[200px]">
        <div className="container relative flex flex-col sm:flex-row items-center md:items-start md:h-full">
          <div className="relative sm:absolute sm:top-10 size-[8rem] sm:size-[12rem] outline outline-daze-white outline-1 -outline-offset-[10px]">
            <img
              src={user.avatar?.url}
              className=" h-full w-full object-cover"
              alt={user.avatar?.alt}
            />
            <div className="absolute flex justify-center sm:justify-start md:left-[14rem] md:-bottom-1 text-daze-white sm:text-daze-text w-full">
              <Button
                text={showAvatar ? "Close" : "Edit avatar"}
                type="tertiary"
                icon={<Camera color="#C78D70" size={20} />}
                onClick={() => setShowAvatar(!showAvatar)}
              />
            </div>
          </div>
          <div className="max-h-[200px] sm:ml-[14rem] pt-8 sm:pt-28 text-daze-white flex flex-col w-full justify-end text-center sm:text-start max-w-[18rem] sm:max-w-full">
            <h1 className="text-2xl sm:text-4xl py-3 sm:py-0 pb-1 sm:p-0">
              {user.name}
            </h1>
            <div className="flex justify-center sm:justify-start items-center text-sm sm:text-base">
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <section className="container-hug flex flex-wrap">
        <div className="mt-5 sm:mt-16 m-2 mb-4 flex-1 min-w-[40%]">
          {error && (
            <div role="alert" className="bg-red-200 p-2 border border-red-400">
              {error}
            </div>
          )}
          {showAvatar ? (
            <div className="flex flex-col gap-5">
              <label className="flex flex-col">
                Enter avatar URL
                <input
                  type="url"
                  name="avatar"
                  id="avatar"
                  className="p-2 w-full max-w-[20rem]"
                  value={avatar.url}
                  placeholder="Enter avatar URL"
                  onChange={(e) =>
                    setAvatar({ ...avatar, url: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                Enter avatar alt
                <input
                  type="text"
                  name="avatar-alt"
                  id="avatar-alt"
                  className="p-2 w-full max-w-[20rem]"
                  value={avatar.alt}
                  placeholder="Enter avatar alt"
                  onChange={(e) =>
                    setAvatar({ ...avatar, alt: e.target.value })
                  }
                />
              </label>
              <div className="max-w-max">
                <Button
                  text="Save"
                  onClick={() => {
                    updateProfile({ avatar });
                    setShowAvatar(false);
                  }}
                />
              </div>
            </div>
          ) : null}
          <h2 className="text-2xl">About me</h2>
          <Button
            text={showBio ? "Close" : "Edit bio"}
            type="tertiary"
            icon={<Pen color="#C78D70" size={20} />}
            onClick={() => setShowBio(!showBio)}
          />
          {showBio ? (
            <div className="flex flex-col gap-5 py-5">
              <textarea
                name="bio"
                id="bio"
                rows={3}
                className="p-5"
                value={bio}
                maxLength={160}
                onChange={(e) => setBio(e.target.value)}
                aria-label="Edit bio"
              >
                {bio}
              </textarea>
              <div className="max-w-max">
                <Button
                  text="Save"
                  onClick={() => {
                    updateProfile({ bio: bio });
                    setShowBio(false);
                    setBio(bio);
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="py-5">{user.bio ? user.bio : "No bio added yet"}</p>
          )}
        </div>
        <div className="bg-daze-primary-op10 flex flex-col p-10 text-center justify-center mx-2 md:max-w-[24rem] w-full">
          {user.venueManager ? (
            <>
              <h2 className="pb-5">You are currently venue manager</h2>
              <p className="pb-5">Still need the rights?</p>
              <Button
                text="Remove"
                onClick={() =>
                  updateProfile({ venueManager: !user.venueManager })
                }
              />
            </>
          ) : (
            <>
              <h2 className="pb-5">Want to manage venues?</h2>
              <p className="pb-5">Apply for venue manager rights</p>
              <Button
                text="Apply"
                onClick={() =>
                  updateProfile({ venueManager: !user.venueManager })
                }
              />
            </>
          )}
        </div>
      </section>
      <hr className="h-10 bg-daze-white" />
      <div className="container my-5 grid grid-cols-[repeat(auto-fit,minmax(18rem,_1fr))] gap-5 ">
        <div className="">
          <h2>
            My upcoming bookings <span>( {bookingsByProfile.length} )</span>
          </h2>
          <div className="flex flex-col gap-2">
            {bookingsByProfile && bookingsByProfile.length > 0 ? (
              bookingsByProfile.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  venueName={booking.venueName}
                  venueImage={booking.venueUrl}
                  rating={booking.rating}
                  openModal={(id, venueName, type) => openModal(id, venueName, type)}
                />
              ))
            ) : (
              <p>No bookings yet.</p>
            )}
          </div>
        </div>
        <div></div>
      </div>

      {/* Admin profile  */}
      {user.venueManager && (
        <div className="my-5">
          <h2 className="container">My venues</h2>
          <div className="bg-daze-primary-op10">
            <div className="container flex justify-center gap-10">
              <Link to="/venue/manage/" className="flex gap-2 items-center">
                <Pen />
                <p>Create new venue</p>
              </Link>
            </div>
          </div>
          <div className="container cards-grid">
            {venuesByProfile && venuesByProfile.length > 0 ? (
              venuesByProfile.map((venue) => (
                <div key={venue.id} className="mb-3">
                  <VenueCard
                    id={venue.id}
                    image={venue.media}
                    name={venue.name}
                    price={venue.price}
                    rating={venue.rating}
                    meta={venue.meta}
                  />
                  <div className="flex justify mt-2 gap-8">
                    <Button
                      text="Edit"
                      type="tertiary"
                      url={`/venue/manage/${venue.id}`}
                      icon={<Pen size={20} />}
                    />
                    <Button
                      text="Delete"
                      type="tertiary"
                      onClick={() => openModal(venue.id, venue.name, "venue")}
                      icon={<Trash color="#8B0404" size={20} />}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No venues yet.</p>
            )}
          </div>
          <Modal
            dialogRef={dialogRef}
            venueNameToDelete={venueNameToDelete}
            closeModal={closeModal}
            confirmDelete={confirmDelete}
            successMessage={successMessage}
          />
          <div className="bg-daze-primary-op10 py-5">
            <h2 className="container">Reservations on my venues</h2>
            <div className="container flex flex-wrap gap-5">
              <div className="h-fit">
                <Calendar
                  venueData={{
                    bookings: venuesByProfile.reduce((venue, currentVenue) => {
                      return venue.concat(currentVenue.bookings);
                    }, []),
                  }}
                />
              </div>
              <div className="flex-[1_1_26rem]">
                <div className="flex flex-col gap-2">
                  {venuesByProfile && venuesByProfile.length > 0 ? (
                    venuesByProfile.map((venue) =>
                      venue.bookings.map((booking) => (
                        <BookingCard
                          type="dark"
                          key={booking.id}
                          booking={booking}
                          venueName={venue.name}
                          venueImage={venue.media[0].url}
                          ownBooking={false}
                          rating={venue.rating}
                        />
                      ))
                    )
                  ) : (
                    <p>No bookings on your venues yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
