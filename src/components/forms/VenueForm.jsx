import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../common/Buttons";
import useVenues from "../../hooks/Store";

const schema = yup
  .object({
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
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    country: yup.string().optional(),
    address: yup.string().optional(),
    zipCode: yup.string().optional(),
    town: yup.string().optional(),
  })

function VenueForm(value) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createVenue = useVenues((state) => state.createVenue);

  async function onSubmitHandler(data) {
    createVenue(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 bg-daze-primary-op10 p-5 rounded-sm"
      >
        <div>
          <label htmlFor="venueName" className="block">Venue name</label>
          <input
            type="text"
            id="venueName" {...register("venueName")}
            className="w-full"
          />
          <p role="alert">{errors.venueName?.message}</p>
        </div>

        <div>
          <label htmlFor="image" className="block">Image</label>
          <input type="url" name="image" id="image" rows="8" title="Must be a live url" className="w-full" {...register("image")}></input>
          <p role="alert">{errors.images?.message}</p>
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea name="description" id="description" rows="8" className="w-full" {...register("description")}></textarea>
          <p role="alert">{errors.description?.message}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" {...register("price")} />
            <p role="alert">{errors.price?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="maxGuests">Max guests</label>
            <input type="text" id="maxGuests" {...register("maxGuests")} />
            <p role="alert">{errors.maxGuests?.message}</p>
          </div>
        </div>

        <fieldset>
          <legend className="font-['Cormorant_Garamond'] uppercase mt-5 mb-3 border-b w-full border-b-daze-primary-op50">Amenities</legend>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="pets" {...register("pets")} />
            Pets
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="wifi" {...register("wifi")} />
            Wifi
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="parking" {...register("parking")} />
            Parking
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="breakfast" {...register("breakfast")} />
            Breakfast
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="font-['Cormorant_Garamond'] uppercase mt-5 mb-3 border-b w-full border-b-daze-primary-op50">Location</legend>
          <div>
            <label htmlFor="address" className="block">Address</label>
            <input type="text" id="address" className="w-full" {...register("address")} />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" {...register("zipCode")} />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="town">Town</label>
              <input type="text" id="town" {...register("town")} />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block">Country</label>
            <input type="text" id="country" className="w-full" {...register("country")} />
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
