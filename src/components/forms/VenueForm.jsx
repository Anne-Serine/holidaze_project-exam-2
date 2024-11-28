import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../common/Buttons";
import useVenues from "../../hooks/Store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const schema = yup.object({
  venueName: yup.string().required("Venue name is required"),
  description: yup.string().required("Description is required").max(600),
  images: yup
    .array()
    .of(yup.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  maxGuests: yup
    .number()
    .typeError("Max guests must be a number")
    .positive("Max guests must be a positive number")
    .required("Max guests is required"),
  meta: yup.object ({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object ({
    country: yup.string().optional(),
    address: yup.string().optional(),
    zipCode: yup.string().optional(),
    city: yup.string().optional(),
  }),
});

function VenueForm(value) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const [venueData, setVenueData] = useState(null);
  const getAllVenues = useVenues((state) => state.getAllVenues);
  const { id } = useParams();

  useEffect(() => {
    async function fetchSingleVenue() {
      const data = await getAllVenues(id);
      setVenueData(data);
      if (data) {
        reset(data); // Populate form with venueData
      }
    }
    {
      id && fetchSingleVenue();
    }
  }, [getAllVenues, id, reset]);

  const createVenue = useVenues((state) => state.createVenue);

  async function onSubmitHandler(data) {
    const updatedData = {
      ...venueData, // Existing data
      ...data, // New updates from the form
    }
    await createVenue(updatedData, id, id ? "PUT" : "POST");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 bg-daze-primary-op10 p-5 rounded-sm"
      >
        <div>
          <label htmlFor="venueName" className="block">
            Venue name
          </label>
          <input
            {...register("venueName")}
            onChange={(e) => setValue("venueName", e.target.value)}
            defaultValue={venueData?.name || ""}
            type="text"
            id="venueName"
            
            className="w-full"
          />
          <p role="alert">{errors.venueName?.message}</p>
        </div>

        <div>
          <label htmlFor="image" className="block">
            Image
          </label>
          <input
            {...register("image")}
            onChange={(e) => setValue("image", e.target.value)}
            defaultValue={venueData ? venueData.media[0].url : ""}
            type="url"
            name="image"
            id="image"
            rows="8"
            title="Must be a live url"
            className="w-full"
          ></input>
          <p role="alert">{errors.images?.message}</p>
        </div>

        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            {...register("description")}
            onChange={(e) => setValue("description", e.target.value)}
            defaultValue={venueData ? venueData.description : ""}
            name="description"
            id="description"
            rows="8"
            className="w-full"
          >
          </textarea>
          <p role="alert">{errors.description?.message}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="price">Price</label>
            <input
              {...register("price")}
              onChange={(e) => setValue("price", e.target.value)}
              defaultValue={venueData ? venueData.price : ""}
              type="text"
              id="price"
            />
            <p role="alert">{errors.price?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="maxGuests">Max guests</label>
            <input
              {...register("maxGuests")}
              onChange={(e) => setValue("maxGuests", e.target.value)}
              defaultValue={venueData ? venueData.maxGuests : ""}
              type="text"
              id="maxGuests"
            />
            <p role="alert">{errors.maxGuests?.message}</p>
          </div>
        </div>

        <fieldset>
          <legend className="font-['Cormorant_Garamond'] uppercase mt-5 mb-3 border-b w-full border-b-daze-primary-op50">
            Amenities
          </legend>
          <label className="flex gap-2 items-center">
            <input
              {...register("pets")}
              defaultChecked={ venueData?.meta.pets }
              onChange={(e) => setValue("pets", e.target.checked)}
              type="checkbox"
              name="pets"
            />
            Pets
          </label>
          <label className="flex gap-2 items-center">
            <input
              {...register("wifi")}
              defaultChecked={ venueData?.meta.wifi }
              onChange={(e) => setValue("wifi", e.target.checked)}
              type="checkbox"
              name="wifi"
            />
            Wifi
          </label>
          <label className="flex gap-2 items-center">
            <input
              {...register("parking")}
              defaultChecked={ venueData?.meta.parking }
              onChange={(e) => setValue("parking", e.target.checked)}
              type="checkbox"
              name="parking"
            />
            Parking
          </label>
          <label className="flex gap-2 items-center">
            <input
              {...register("breakfast")}
              defaultChecked={ venueData?.meta.breakfast }
              onChange={(e) => setValue("breakfast", e.target.checked)}
              type="checkbox"
              name="breakfast"
            />
            Breakfast
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="font-['Cormorant_Garamond'] uppercase mt-5 mb-3 border-b w-full border-b-daze-primary-op50">
            Location
          </legend>
          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <input
              {...register("address")}
              defaultValue={venueData ? venueData.location.address : ""}
              onChange={(e) => setValue("address", e.target.value)}
              type="text"
              id="address"
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                {...register("zipCode")}
                defaultValue={venueData ? venueData.location.zip : ""}
                onChange={(e) => setValue("zip", e.target.value)}
                type="text"
                id="zipCode"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="town">City</label>
              <input
                {...register("city")}
                defaultValue={venueData ? venueData.location.city : ""}
                onChange={(e) => setValue("city", e.target.value)}
                type="text"
                id="city"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block">
              Country
            </label>
            <input
              {...register("country")}
              defaultValue={venueData ? venueData.location.country : ""}
              onChange={(e) => setValue("country", e.target.value)}
              type="text"
              id="country"
              className="w-full"
            />
          </div>
        </fieldset>

        <div className="mt-5 mx-auto">
          <Button text="Post" onClick={() => value} />
        </div>
      </form>
    </>
  );
}

export default VenueForm;
