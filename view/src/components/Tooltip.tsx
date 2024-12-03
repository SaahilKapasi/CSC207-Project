import { ReactElement } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps): ReactElement {
  return (
    <div className="tooltip h-6 w-6 tooltip-bottom" data-tip={text}>
      <IoMdInformationCircleOutline className="text-blue-500 h-full w-full" />
    </div>
  );
}
