from backend.entites.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.bias_analyzer import BiasAnalyzer


class SimpleAnalyzer(BiasAnalyzer):
    dataset: DatasetFile

    def get_overall_analysis(self) -> str:
        level = self.score_to_level()
        high_impact = self.get_impact_categories("high")
        medium_impact = self.get_impact_categories("medium")
        low_impact = self.get_impact_categories("low")

        result = f"The overall amount of bias is {level}.\n\n"

        if high_impact:
            result += f" The following categories have extremely high bias and should be addressed soon: {', '.join(high_impact)}.\n\n"

        if medium_impact:
            result += f" The following categories have medium bias and should be addressed when possible: {', '.join(medium_impact)}.\n\n"

        if low_impact:
            result += f" The following categories have low bias, if you adjust your model try to keep them low: {', '.join(low_impact)}."

        return result

    def score_to_level(self, category="all") -> str:
        score = self.dataset.get_overall_score() \
            if category == "all" else self.dataset.get_category_score(category)
        if score <= 3.4:
            return "high"
        elif score <= 6.7:
            return "medium"
        else:
            return "low"
