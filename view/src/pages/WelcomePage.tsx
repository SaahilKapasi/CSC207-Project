import axios from "axios";
import { ReactElement, useState } from "react";
import { API_BASE_URL } from "../consts/consts";
import { Dataset } from "../types/types";
import FileUploadForm from "../components/FileUploadForm";

interface WelcomePageProps {
  onDataset: (dataset: Dataset) => void;
  onSubmit: () => void;
}

export default function WelcomePage({
  onDataset,
  onSubmit,
}: WelcomePageProps): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  async function handleFileSubmit(file: File) {
    onSubmit();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/generateDataset`,
        formData
      );
      onDataset(response.data);
      setUploadStatus("File uploaded successfully.");
    } catch (error) {
      console.error(error);
      setUploadStatus("File upload failed. Please try again.");
    }
  }

  return (
    <div className="w-screen h-[90vh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center p-6 bg-gray-100 shadow-lg rounded-lg">
        <p className="text-2xl font-semibold mb-6 text-gray-700">Import Data Set</p>
        <FileUploadForm
          file={file}
          setFile={setFile}
          onSubmit={handleFileSubmit}
        />
        <p aria-live="polite" className="sr-only">
          {uploadStatus}
        </p>
      </div>
    </div>
  );
}
