import { ReactElement, ReactNode } from "react";

interface ModalProps {
  content: ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, content }: ModalProps): ReactElement {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0">
      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={onClose}
        aria-hidden="true" // Mark as hidden for screen readers
      />

      <div
        className="absolute bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        role="document" // Defines the modal content as a document for assistive technologies
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 px-2 text-lg rounded-lg hover:bg-red-600 transition-all focus:outline focus:outline-red-700 focus:outline-offset-2"
          onClick={onClose}
        >
          ×
        </button>
        {content}
      </div>
    </div>
  );
}
