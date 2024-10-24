import { ReactElement, useEffect, useState } from "react";

interface NavbarProps {}

export default function Navbar({}: NavbarProps): ReactElement {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const URL = `/hifive/api/hello/${
      window.location.pathname.split("/hifive/")[1] || "Unknown User"
    }`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => setContent(data.message));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen z-50 flex justify-between p-3 border-gray-200 border-b-2 bg-gray-100 items-center">
      <div className="w-32">{content}</div>
      <div className="flex gap-1">
        <p className="">Data Set:</p>
        <p className="underline">Model V3.csv</p>
        <button>📝</button>
      </div>
      <div className="w-32"></div>
    </div>
  );
}
