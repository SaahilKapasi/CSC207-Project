interface CopyLinkButtonProps {
    datasetId: string;
  }
  
  export default function CopyLinkButton({
    datasetId,
  }: CopyLinkButtonProps): JSX.Element {
    return (
      <button
        className="absolute top-5 right-5 btn"
        onClick={() =>
          navigator.clipboard.writeText(`${window.location.origin}/#${datasetId}`)
        }
        aria-label="Copy link to this dataset"
      >
        Copy link
      </button>
    );
  }
  