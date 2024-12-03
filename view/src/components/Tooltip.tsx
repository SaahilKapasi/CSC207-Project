import { ReactElement } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps): ReactElement {
  return (
    <div 
    role="tooltip"
    className="tooltip h-6 w-6 tooltip-bottom" 
    data-tip={text}
    aria-label={text}
    >
      <IoMdInformationCircleOutline 
      className="text-blue-500 h-full w-full" 
      data-testid="tooltip-icon"/>
    </div>
  );
}
