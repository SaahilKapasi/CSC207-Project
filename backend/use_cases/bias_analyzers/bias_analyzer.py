"""
bias_analyzer.py

This module defines the `BiasAnalyzer` class, which provides an abstract interface for
analyzing bias in a dataset. Subclasses are expected to implement specific bias analysis methods.

The `BiasAnalyzer` class operates on `DatasetFile` instances and provides methods for:
- Retrieving overall analysis results.
- Categorizing scores into levels.
- Identifying categories with specific levels of bias impact.
"""

from backend.entities.dataset_files.dataset_file import DatasetFile


class BiasAnalyzer:
    """
    Provides an abstract base for analyzing bias in datasets.

    Attributes:
        dataset (DatasetFile): The dataset to be analyzed.
    """

    dataset: DatasetFile

    def __init__(self, dataset: DatasetFile):
        """
        Initializes the BiasAnalyzer with a given dataset.

        If the provided dataset is unprocessed, a warning is logged.

        Args:
            dataset (DatasetFile): The dataset to analyze.
        """
        self.dataset = dataset

        if not self.dataset.is_processed:
            print("An error has occurred, the analyzer was given an unprocessed dataset.")

    def get_overall_analysis(self) -> str:
        """
        Retrieves an overall analysis summary of the dataset.

        This method must be implemented by subclasses to provide specific analysis logic.

        Returns:
            str: A textual summary of the dataset analysis.

        Raises:
            NotImplementedError: If not implemented in a subclass.
        """
        raise NotImplementedError

    def score_to_level(self, category="all") -> str:
        """
        Maps a bias score to a qualitative level (e.g., "low", "medium", "high").

        This method must be implemented by subclasses to provide specific scoring logic.

        Args:
            category (str): The category for which to retrieve the level. Defaults to "all".

        Returns:
            str: The qualitative level corresponding to the bias score.

        Raises:
            NotImplementedError: If not implemented in a subclass.
        """
        raise NotImplementedError

    def get_impact_categories(self, level) -> list[str]:
        """
        Identifies categories in the dataset that have a specified bias level.

        Args:
            level (str): The desired bias level to filter categories (e.g., "high").

        Returns:
            list[str]: A list of categories with the specified bias level.
        """
        return [category for category in self.dataset.categories if self.score_to_level(category) == level]
