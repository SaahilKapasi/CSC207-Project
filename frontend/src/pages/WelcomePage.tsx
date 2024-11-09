import axios from "axios";
import { ReactElement, useState } from "react";
import { Dataset } from "../types/types";

interface WelcomePageProps {
  onDataset: (dataset: Dataset) => void;
}

export default function WelcomePage({
  onDataset,
}: WelcomePageProps): ReactElement {
  const [file, setFile] = useState<File>();

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  async function handleFileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/generateDataset", formData);
      onDataset(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-screen">
      <div className="flex flex-col mx-auto items-center">
        <p className="text-xl mb-5">Import data set</p>
        <form onSubmit={handleFileSubmit} className="flex gap-3">
          <input
            type="file"
            className="file-input file-input-bordered"
            onChange={handleFile}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
