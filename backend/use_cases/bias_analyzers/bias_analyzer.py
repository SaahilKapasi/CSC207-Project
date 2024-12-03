from backend.entites.dataset_files.dataset_file import DatasetFile


class BiasAnalyzer:
    """
    A base class for analyzing bias in dataset files.

    This class provides a framework for bias analysis, including methods for overall analysis,
    converting scores to bias levels, and identifying impact categories.

    Attributes:
        dataset (DatasetFile): The dataset file to be analyzed.
    """

    dataset: DatasetFile

    def __init__(self, dataset: DatasetFile):
        """
        Initialize the BiasAnalyzer with a dataset.

        Args:
            dataset (DatasetFile): The dataset file to be analyzed.
        """
        self.dataset = dataset

    def get_overall_analysis(self) -> str:
        """
        Generate an overall analysis of bias in the dataset.

        This method should be implemented by subclasses to provide a comprehensive
        summary of bias levels across all categories in the dataset.

        Returns:
            str: A string containing the overall bias analysis.

        Raises:
            NotImplementedError: This method must be implemented by subclasses.
        """
        raise NotImplementedError

    def score_to_level(self, category="all") -> str:
        """
        Convert a numerical bias score to a qualitative level.

        This method should be implemented by subclasses to interpret the bias score
        for a given category or the overall dataset and return a corresponding
        qualitative level.

        Args:
            category (str, optional): The specific category to evaluate. Defaults to "all"
                                      for overall dataset score.

        Returns:
            str: The bias level as a string (e.g., "high", "medium", "low").

        Raises:
            NotImplementedError: This method must be implemented by subclasses.
        """
        raise NotImplementedError

    def get_impact_categories(self, level) -> list[str]:
        """
        Identify categories with a specific impact level based on their bias scores.

        This method filters the dataset categories and returns those that match
        the specified bias level.

        Args:
            level (str): The bias level to filter categories by (e.g., "high", "medium", "low").

        Returns:
            list[str]: A list of category names that match the specified bias level.
        """

        return [category for category in self.dataset.categories if self.score_to_level(category) == level]



