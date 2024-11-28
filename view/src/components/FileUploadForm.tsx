interface FileUploadFormProps {
    file: File | null;
    setFile: (file: File | null) => void;
    onSubmit: (file: File) => void;
  }
  
  export default function FileUploadForm({
    file,
    setFile,
    onSubmit,
  }: FileUploadFormProps): JSX.Element {
    function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
      const selectedFile = event.target.files?.[0];
      setFile(selectedFile || null);
    }
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!file) return;
      onSubmit(file);
    }
  
    return (
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <label
          className="relative cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          aria-label="Choose a file to upload"
        >
          CHOOSE FILE
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFile}
          />
        </label>
        <span className="text-gray-500">{file ? file.name : "No file selected"}</span>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
        >
          Submit
        </button>
      </form>
    );
  }
  