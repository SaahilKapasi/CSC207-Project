import axios from "axios";
import { API_BASE_URL } from "../consts/consts";
import { Dataset } from "../types/types";

interface CopyComparisonLinkButtonProps {
  selectedDataset1: Dataset | undefined;
  selectedDataset2: Dataset | undefined;
}

export default function CopyComparisonLinkButton({
  selectedDataset1,
  selectedDataset2,
}: CopyComparisonLinkButtonProps): JSX.Element {
  const handleCopyLink = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/saveComparison`, {
      data: JSON.stringify({
        dataset1: selectedDataset1,
        dataset2: selectedDataset2,
      }),
    });
    const comparisonId = response.data;
    navigator.clipboard.writeText(`${window.location.origin}/#${comparisonId}`);
  };

  return (
    <button
      className="absolute top-5 right-5 btn"
      onClick={handleCopyLink}
      aria-label="Copy comparison link"
    >
      Copy link
    </button>
  );
}
