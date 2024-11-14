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
        <div className="bg-daze-gray text-daze-white col-span-1 flex flex-col p-10 text-center justify-center max-w-[18rem]">
          <h2 className="pb-5">Lorem ipsum dolor sit amet</h2>
          <p className="pb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button text="Click" />
        </div>
      </div>
    </div>
  );
}

export default VenueManagementForm;
