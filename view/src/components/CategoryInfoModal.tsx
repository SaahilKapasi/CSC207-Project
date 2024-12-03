import { Category } from "../types/types";
import { capitalize } from "../utils/string";
import BiasProgressBar from "./BiasProgressBar";
import Graph from "./Graph";
import Modal from "./Modal";

interface SelectedCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export default function CategoryInfoModal({
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
          <p
            id="modal-description"
            className="mt-5 max-w-96 mb-10 text-sm whitespace-pre-line"
          >
            The bias is calculated by taking the variance between the false
            positive rates. The higher the variance between the different false
            positive rates, the higher the bias.
            {"\n\n"}
            The False Positive Rate (FPR) for this measures the ratio of
            transactions are incorrectly flagged as fraudulent. This metric
            evaluates the proportion of false positives relative to the total
            number of transactions that are actually not fraudulent.
          </p>
          <Graph
            name={`False Positive Rate V.S. ${capitalize(category.name)}`}
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
            keyboardNavigationEnabled={false}
            valueToText={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <div className="mt-32" />
        </div>
      }
      onClose={onClose}
    />
  );
}
