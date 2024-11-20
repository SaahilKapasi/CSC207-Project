import { ReactElement } from "react";
import { Category } from "../types/types";

interface ModalProps {
  onClose: () => void;
  onSelect: (category: Category) => void;
  categories: Category[];
}

function scoreToColor(score: number) {
  if (score < 3.3) {
    return "red-700";
  } else if (score < 6.6) {
    return "yellow-500";
  } else {
    return "green-700";
  }
}

function scoreToWarningText(score: number) {
  if (score < 3.3) {
    return "❗❗";
  } else if (score < 6.6) {
    return "❗";
  } else {
    return "";
  }
}

export default function SettingModal({
  categories,
  onClose,
  onSelect,
}: ModalProps): ReactElement {
  return (
      <div
          className="fixed z-50 w-screen h-screen top-0 left-0"
          role="dialog"
          aria-labelledby="setting-modal-title"
          aria-describedby="setting-modal-description"
      >
        <div
            className="bg-black opacity-50 h-full w-full absolute"
            onClick={onClose}
            aria-hidden="true" // Mark as hidden for screen readers
        />

        <div
            className="absolute w-96 bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            role="document" // Defines the modal content as a document for assistive technologies
        >
          {/* Modal title */}
          <p id="setting-modal-title" className="text-xl">
            Choose X-Axis
          </p>

          {/* Modal description for screen readers */}
          <p id="setting-modal-description" className="sr-only">
            Select a category to configure the X-axis of the chart.
          </p>

          {/* Category options */}
          <div className="flex-col gap-3 flex mt-5">
            {categories.map((item) => (
                <button
                    key={item.name} // Add a unique key for each button
                    className="p-1 bg-gray-100 w-32 hover:bg-gray-200 text-start px-3 flex justify-between focus:outline focus:outline-blue-700 focus:outline-offset-2"
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    aria-label={`Select ${item.name} category`}
                >
                  {/* Category name */}
                  <p>{item.name}</p>

                  {/* Warning text based on score */}
                  <p>{scoreToWarningText((item.fprVarianceScore + item.fprMeanScore) / 2)}</p>
                </button>
            ))}
          </div>

          {/* Close button */}
          <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all focus:outline focus:outline-red-700 focus:outline-offset-2"
              onClick={onClose}
              aria-label="Close settings modal"
          >
            Close
          </button>
        </div>
      </div>
  );
}