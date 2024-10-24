import { ReactElement } from "react";

interface NavbarProps {}

export default function Navbar({}: NavbarProps): ReactElement {
  return (
    <div className="fixed top-0 left-0 w-screen z-50 flex justify-center p-3 border-gray-200 border-b-2 bg-gray-100">
      <div className="flex gap-1">
        <p className="">Data Set:</p>
        <p className="underline">Model V3.csv</p>
        <button>📝</button>
      </div>
    </div>
  );
}
