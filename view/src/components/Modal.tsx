import FocusTrap from "focus-trap-react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  content: ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, content }: ModalProps): ReactElement {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Focus the close button when the modal opens
    closeButtonRef.current?.focus();
  }, []);

  return (
    <FocusTrap>
      <div className="fixed z-50 w-screen h-screen top-0 left-0">
        {/* Background overlay */}
        <div
          data-testid="modal-overlay"
          className="bg-black opacity-50 h-full w-full absolute"
          onClick={onClose}
          aria-hidden="true" // Mark as hidden for screen readers
        />

        {/* Modal Content */}
        <div
          className="absolute bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          role="document" // Defines the modal content as a document for assistive technologies
        >
          {/* Close button */}
          <button
            ref={closeButtonRef} // Attach the ref to the close button
            className="absolute top-2 right-2 px-2 text-lg rounded-lg hover:bg-red-600 transition-all focus-visible:outline focus-visible:outline-red-700 focus-visible:outline-offset-2"
            onClick={onClose}
            aria-label="Close Modal" // Accessible label for the button
          >
            ×
          </button>
          {content}
        </div>
      </div>
    </FocusTrap>
  );
}
