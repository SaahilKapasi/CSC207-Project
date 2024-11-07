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
    <div className="fixed z-50 w-screen h-screen top-0 left-0">
      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={onClose}
      />
      <div className="absolute w-96 bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <p className="text-xl">Choose X-Axis</p>
        <div className="flex-col gap-3 flex mt-5">
          {categories.map((item) => (
            <button
              className="p-1 bg-gray-100 w-32 hover:bg-gray-200 text-start px-3 flex justify-between"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              <p>{item.name}</p>
              <p>
                {scoreToWarningText(
                  (item.fprVarianceScore + item.fprMeanScore) / 2
                )}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
