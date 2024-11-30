import Button from "../components/common/Buttons";
import VenueForm from "../components/forms/VenueForm";

function VenueManagementForm() {
  return (
    <div>
      <hr className="h-10 bg-daze-white" />
      <div className="max-w-[50rem] mx-auto px-2 flex flex-wrap gap-5">
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl py-5">New venue</h1>
          <VenueForm />
        </div>
        <div className="bg-daze-gray text-daze-white col-span-1 flex flex-col px-10 py-12 text-center max-w-[18rem]">
          <h2 className="pb-5">Tips for Creating Venues</h2>
          <ul className="text-sm pb-8 text-left list-disc pl-5 flex flex-col gap-4">
            <li>Provide a clear and catchy name for your venue.</li>
            <li>Include high-quality images to attract more bookings.</li>
            <li>Set a competitive price based on the market and amenities offered.</li>
            <li>Add detailed descriptions to highlight unique features.</li>
          </ul>
          <p className="pb-5">
            Already have venues? Manage them from your profile page!
          </p>
          <div className="mt-8">
            <Button text="Manage" url="/profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueManagementForm;
