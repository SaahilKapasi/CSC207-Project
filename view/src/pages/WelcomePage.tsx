import axios from "axios";
import { ReactElement, useState } from "react";
import { API_BASE_URL } from "../consts/consts";
import { Dataset } from "../types/types";

interface WelcomePageProps {
  onDataset: (dataset: Dataset) => void;
  onSubmit: () => void;
}

export default function WelcomePage({
  onDataset,
  onSubmit,
}: WelcomePageProps): ReactElement {
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<string>("");

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  async function handleFileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setUploadStatus("No file selected. Please choose a file to upload.");
      return;
    }

    onSubmit();

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/generateDataset`,
        formData
      );
      onDataset(response.data);
    } catch (error) {
      console.error(error);
      setUploadStatus("File upload failed. Please try again.");
    }
  }

  return (
    <div className="w-screen h-[90vh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center p-6 bg-gray-100 shadow-lg rounded-lg">
        {/* Header */}
        <p className="text-2xl font-semibold mb-6 text-gray-700">
          Import Data Set
        </p>

        {/* Form */}
        <form onSubmit={handleFileSubmit} className="flex gap-4 items-center">
          {/* File Input */}
          <label className="relative cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
            CHOOSE FILE
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFile}
              aria-label="Upload dataset file"
            />
          </label>
          {/* Display selected file name */}
          <span className="text-gray-500">
            {file ? file.name : "No file selected"}
          </span>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Submit
          </button>
        </form>

        {/* ARIA live region for status updates */}
        <p aria-live="polite" className="sr-only">
          {uploadStatus}
        </p>
      </div>
    </div>
  );
}
