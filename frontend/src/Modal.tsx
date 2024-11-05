import { ReactElement } from "react";

interface ModalProps {
  onClose: () => void;
  onSelect: (axis: string) => void;
}

export default function Modal({ onClose, onSelect }: ModalProps): ReactElement {
  return (
    <div className="fixed z-100 w-screen h-screen top-0 left-0">
      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={onClose}
      />
      <div className="w-full h-full flex items-center justify-center absolute">
        <div className="w-96 bg-white rounded-md flex items-center flex-col p-8">
          <p className="text-xl">Choose X-Axis</p>
          <div className="flex-col gap-3 flex mt-5">
            {["Race", "Ethnicity", "Gender", "Location", "Disability"].map(
              (item) => (
                <button
                  className="p-1 bg-gray-100 w-32 hover:bg-gray-200"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
