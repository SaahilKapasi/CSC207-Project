import BiasProgressBar from "../components/BiasProgressBar";
import Graph from "../components/Graph";
import { Category } from "../types/types";
import { capitalize } from "../utils/string";
import Modal from "./Modal";

interface SelectedCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export default function SelectedCategoryModal({
  category,
  onClose,
}: SelectedCategoryModalProps): JSX.Element {
  return (
    <Modal
      content={
        <div
          className="mt-0 w-[50rem] max-w-[90vw] flex flex-col items-center"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <p id="modal-title" className="mb-2 text-lg">
            {capitalize(category.name)} Bias Detected:
          </p>
          <BiasProgressBar
            bias={10 - category.fprScore}
            aria-label={`Bias score for ${category.name}: ${
              10 - category.fprScore
            }`}
          />
          <p id="modal-description" className="mt-5 max-w-96 mb-10 text-md">
            Description TBD. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nesciunt iure unde, harum consectetur ipsa nemo mollitia
            repellat hic eveniet minima molestiae laborum natus ratione deleniti
            animi sit. Voluptatum, deserunt qui.
          </p>
          <Graph
            name={`${capitalize(category.name)} V.S. False Positive Rate`}
            entries={category.traits.map((t) => ({
              name: t.name,
              value: t.fprMean,
            }))}
            getColor={() => "blue-500"}
            maxValue={1}
            maxValueLabel="100%"
            zeroValueLabel="0%"
            aria-label={`Graph showing false positive rates for ${capitalize(
              category.name
            )} traits`}
          />
          <div className="mt-32" />
        </div>
      }
      onClose={onClose}
    />
  );
}
