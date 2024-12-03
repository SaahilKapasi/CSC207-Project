from backend.entites.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.bias_analyzer import BiasAnalyzer


class SimpleAnalyzer(BiasAnalyzer):
    """
   A simple analyzer for bias in dataset files.

   This class extends BiasAnalyzer to provide basic analysis of bias in datasets,
   categorizing bias levels and identifying high, medium, and low impact categories.

   Attributes:
       dataset (DatasetFile): The dataset file to be analyzed.
   """

dataset: DatasetFile


    def get_overall_analysis(self) -> str:
        """
       Generate an overall analysis of bias in the dataset.

       This method provides a comprehensive summary of bias levels across all categories,
       highlighting high, medium, and low impact areas.

       Returns:
           str: A formatted string containing the overall bias analysis, including:
                - The overall bias level
                - Categories with high bias that need immediate attention
                - Categories with medium bias that should be addressed
                - Categories with low bias that should be maintained

       Note:
           The analysis is based on the bias scores calculated for each category in the dataset.
       """

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
        """
       Convert a numerical bias score to a qualitative level.

       This method interprets the bias score for a given category or the overall dataset
       and returns a corresponding qualitative level.

       Args:
           category (str, optional): The specific category to evaluate. Defaults to "all"
                                     for overall dataset score.

       Returns:
           str: The bias level as a string: "high", "medium", or "low".

       Note:
           - Scores <= 3.4 are considered "high" bias
           - Scores > 3.4 and <= 6.7 are considered "medium" bias
           - Scores > 6.7 are considered "low" bias
       """
        score = self.dataset.get_overall_score() \
            if category == "all" else self.dataset.get_category_score(category)
        if score <= 3.4:
            return "high"
        elif score <= 6.7:
            return "medium"
        else:
            return "low"
