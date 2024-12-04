"""
dataset_file.py

This module defines the DatasetFile class, which represents a dataset file and provides
methods for analyzing its content. The class supports extracting categories, calculating
trait counts, and fetching scores based on pre-defined categories and attributes.
"""
from typing import BinaryIO

import pandas as pd
from backend.entities.protected_classes import PROTECTED_CLASSES


class DatasetFile:
    """
    Represents a dataset file and provides methods for analysis, including identifying
    categories, calculating trait counts, and fetching scores.

    Attributes:
        df (pd.DataFrame): The loaded dataset.
        categories (set): A set of categories present in the dataset.
        score (float): The overall score for the dataset.
        category_scores (dict[str, float]): Scores associated with each category.
        category_fprs (dict[str, dict[str, float]]): False positive rates for each category, calculated using
            `obtain_fpr_map`.
        is_processed (bool): Indicates whether the dataset has been processed.
    """

    df: pd.DataFrame
    categories: set
    score: float
    category_scores: dict[str, float]
    category_fprs: dict[str, dict[str, float]]
    is_processed: bool

    def __init__(self, file_address: str | BinaryIO) -> None:
        """
        Initializes a DatasetFile instance by loading a file and extracting categories.

        This method sets the initial values for categories, scores, and FPR-related attributes.
        It relies on a subclass implementation of `load_file`.

        Args:
            file_address (BinaryIO): The file object or file-like object to load.
        """
        self.load_file(file_address)
        self.categories = self.get_present_categories()
        self.score = 0
        self.category_scores = {category: 0 for category in self.categories}
        self.is_processed = False

    def load_file(self, file_address: str | BinaryIO) -> None:
        """
        Loads the dataset file into a DataFrame. This method must be implemented by subclasses.

        Args:
            file_address (BinaryIO): The file object or file-like object to load.

        Raises:
            NotImplementedError: This method should be implemented by subclasses.
        """
        raise NotImplementedError

    def get_present_categories(self) -> set:
        """
        Identifies the categories present in the dataset based on the column names.

        A category is considered "present" if its column name matches one of the protected classes
        defined in the `PROTECTED_CLASSES` set.

        Returns:
            set: A set of categories that match protected classes.
        """
        cats_exist = set()
        for i in self.df.columns:
            if i.lower() in PROTECTED_CLASSES:
                cats_exist.add(i)
        return cats_exist

    def get_category_traits(self, category: str) -> set:
        """
        Retrieves the unique traits for a specific category.

        Args:
            category (str): The category for which to retrieve traits.

        Returns:
            set: A set of unique traits in the category.
        """
        return set(self.df[category])

    def get_category_trait_counts(self, category: str) -> dict:
        """
        Counts the occurrences of each trait in a given category.

        Args:
            category (str): The category for which to count traits.

        Returns:
            dict: A dictionary with traits as keys and their counts as values.
        """
        result = {}
        traits = set(self.df[category])
        for trait in traits:
            count = self.df[self.df[category] == trait].shape[0]
            result[trait] = count
        return result

    def get_category_trait_fprs(self, category: str) -> dict:
        """
        Retrieves false positive rates (FPRs) for the traits of a given category.

        FPRs are calculated using the `obtain_fpr_map` function, which evaluates the rate for
        each unique value (or range, for numerical data) in the category column.

        Args:
            category (str): The category for which to retrieve FPRs.

        Returns:
            dict: A dictionary of false positive rates for each trait in the category.
        """
        return self.category_fprs[category]

    def get_category_score(self, category: str) -> float | None:
        """
        Retrieves the score for a specific category.

        Args:
            category (str): The category for which to retrieve the score.

        Returns:
            float | None: The score for the category, or None if the category is not present.
        """
        if category in self.categories:
            return self.category_scores[category]
        return None

    def get_overall_score(self) -> float:
        """
        Retrieves the overall score for the dataset.

        Returns:
            float: The overall score.
        """
        return self.score
