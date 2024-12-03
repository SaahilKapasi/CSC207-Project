"""
simple_analyzer.py

This module defines the `SimpleAnalyzer` class, a concrete subclass of `BiasAnalyzer`.

The `SimpleAnalyzer` performs a basic bias analysis on a dataset by:
- Generating an overall bias analysis summary.
- Mapping bias scores to qualitative levels ("high", "medium", "low").
"""

from backend.entities.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.bias_analyzer import BiasAnalyzer


class SimpleAnalyzer(BiasAnalyzer):
    """
    A basic implementation of the `BiasAnalyzer` for analyzing dataset bias.

    Attributes:
        dataset (DatasetFile): The dataset to be analyzed.
    """

    dataset: DatasetFile

    def get_overall_analysis(self) -> str:
        """
        Generates a textual summary of the dataset's overall bias analysis.

        The summary includes:
        - The overall bias level.
        - A list of categories with "high", "medium", or "low" bias levels, along with recommendations.

        Returns:
            str: A detailed bias analysis summary.
        """
        level = self.score_to_level()
        high_impact = self.get_impact_categories("high")
        medium_impact = self.get_impact_categories("medium")
        low_impact = self.get_impact_categories("low")

        result = f"The overall amount of bias is {level}.\n\n"

        if high_impact:
            result += (f"The following categories have extremely high bias and should be addressed soon: "
                       f"{', '.join(high_impact)}.\n\n")

        if medium_impact:
            result += (f"The following categories have medium bias and should be addressed when possible: "
                       f"{', '.join(medium_impact)}.\n\n")

        if low_impact:
            result += (f"The following categories have low bias; if you adjust your model, try to keep them low: "
                       f"{', '.join(low_impact)}.")

        return result

    def score_to_level(self, category="all") -> str:
        """
        Maps a bias score to a qualitative level ("high", "medium", "low").

        The mapping is based on the following thresholds:
        - "low": Score <= 3.4
        - "medium": 3.4 < Score ≤ 6.7
        - "high": Score > 6.7

        Args:
            category (str): The category for which to retrieve the level. Defaults to "all"
                            to compute the overall score level.

        Returns:
            str: The qualitative level corresponding to the bias score ("high", "medium", "low").
        """
        score = self.dataset.get_overall_score() \
            if category == "all" else self.dataset.get_category_score(category)
        if score <= 3.4:
            return "low"
        elif score <= 6.7:
            return "medium"
        else:
            return "high"
