import { Check, CircleCheck, CircleX } from "lucide-react";
import Button from "./Buttons";

function Modal({
  dialogRef,
  venueNameToDelete,
  closeModal,
  confirmDelete,
  successMessage,
}) {
  return (
    <dialog
      ref={dialogRef}
      className="bg-white max-w-[18rem] p-5 rounded-sm shadow-md backdrop:bg-daze-gray backdrop:opacity-70"
    >
      {successMessage ? (
        <p className="flex flex-col gap-4 text-center items-center">
          <Check color="green" size={30} />
          {successMessage}
        </p>
      ) : (
        <>
          <p>{`Are you sure you want to delete "${venueNameToDelete}"?`}</p>
          <div className="flex gap-4 justify-between mt-4">
            <Button
              text="Cancel"
              type="tertiary"
              icon={<CircleX color="#8B0404" size={20} />}
              onClick={closeModal}
            />
            <Button
              text="Delete"
              type="tertiary"
              icon={<CircleCheck color="#2F4A52" size={20} />}
              onClick={confirmDelete}
            />
          </div>
        </>
      )}
    </dialog>
  );
}

export default Modal;
