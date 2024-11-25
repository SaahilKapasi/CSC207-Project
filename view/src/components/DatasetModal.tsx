import { ReactElement, useEffect, useRef } from "react";
import { Dataset } from "../types/types";

interface ModalProps {
  onClose: () => void;
  onSelect: (dataset: Dataset) => void;
  onNewDataset: () => void;
  datasets: Dataset[];
}

export default function DatasetModal({
  datasets,
  onClose,
  onSelect,
  onNewDataset,
}: ModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Set initial focus on the first button when the modal opens
  useEffect(() => {
    if (modalRef.current) {
      const firstFocusableElement = modalRef.current.querySelector(
        "button"
      ) as HTMLElement;
      firstFocusableElement?.focus();
    }
    return () => {
      previouslyFocusedElement.current?.focus(); // Return focus to the triggering element when the modal closes
    };
  }, []);

  // Trap focus within the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusableElements =
          modalRef.current?.querySelectorAll<HTMLElement>(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
          );
        if (focusableElements) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === "Escape") {
        onClose(); // Close modal on 'Escape' key press
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="fixed z-50 w-screen h-screen top-0 left-0"
      role="dialog"
      aria-labelledby="dataset-modal-title"
      aria-describedby="dataset-modal-description"
    >

      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={onClose}
        aria-hidden="true" // Mark as hidden for screen readers
      />
      <div
          className="absolute min-w-96 bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <p id="dataset-model-title" className="text-xl">
          Choose Dataset
        </p>

        {/* Modal description for screen readers */}
        <p id="dataset-modal-description" className="sr-only">
          Select a dataset from the list below or create a new one.
        </p>

        <div className="flex-col gap-3 flex mt-5">
          {datasets.map((dataset) => (
              <div key={dataset.id} className="flex gap-3 justify-between">
                {/* Select dataset button */}
                <button
                    className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
                    onClick={() => {
                      onSelect(dataset);
                      onClose();
                    }}
                    tabIndex={-1} // Exclude from Tab navigation
                    aria-label={`Select dataset ${dataset.name}`}
                >
                  {dataset.name}
                </button>

                <button
                    className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
                    onClick={() => {
                      navigator.clipboard.writeText(
                          `${window.location.origin}/${dataset.id}`
                      );
                      onClose();
                    }}
                    aria-label={`Copy link for dataset ${dataset.name}`}
                >
                  Copy Link
                </button>
              </div>
          ))}


      <div className="flex gap-3 justify-between">
        <button
            className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
            onClick={() => {
              onNewDataset();
              onClose();
            }}
            aria-label="Create new dataset"
        >
          New Dataset
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}
