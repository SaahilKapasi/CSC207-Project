"""
file_analysis.py

This module defines a File class, used to handle a dataset and calculate bias scores based on protected categories.
The File class provides methods for calculating bias scores using different statistical measures, such as variance
and mean-based false positive rates (FPRs), across specified protected categories in the dataset.

Classes:
    File: Represents a dataset, calculates category-specific bias scores, and computes an overall bias score
          across multiple categories using various scoring methods.

Dependencies:
    - pandas: For handling infrastructure operations on DataFrames.
    - helpers: Contains utility functions for identifying protected categories in a DataFrame.
    - bias_calculator: Contains functions for calculating individual and overall bias scores.

Usage:
    Create a File instance by providing the file path of a CSV dataset.
    Use instance methods to retrieve bias scores for specific categories or an overall score.
"""
from typing import BinaryIO

import pandas as pd

from backend.entities.protected_classes import PROTECTED_CLASSES


class DatasetFile:
    """
    A class for handling and calculating bias scores for a dataset with protected categories.

    Attributes:
        df (pd.DataFrame): The DataFrame containing the dataset.
        categories (set): A set of protected categories present in the dataset.

    Methods:
        get_category_var_score(category): Get the variance-based bias score for a specific category.
        get_category_mean_score(category): Get the mean-based bias score for a specific category.
        get_overall_score(method): Calculate the overall bias score across categories based on the specified method.
    """
    df: pd.DataFrame
    categories: set
    score: float
    category_scores: dict[str, float]
    category_fprs: dict[str, dict[str, float]]
    is_processed: bool

    def __init__(self, file_address: BinaryIO):
        self.load_file(file_address)
        self.categories = self.get_present_categories()
        self.score = 0
        self.category_scores = {category: 0 for category in self.categories}
        self.category_scores = {category: 0 for category in self.categories}
        self.is_processed = False

    def load_file(self, file_address: BinaryIO):
        raise NotImplementedError

    def get_present_categories(self) -> set:
        """
        Identify protected categories that exist as columns in the DataFrame.
        Parameters:
           df (pd.DataFrame): The DataFrame to check for protected categories
        Returns:
           set: Set of column names that match protected classes
       """
        cats_exist = set()
        for i in self.df.columns:
            if i.lower() in PROTECTED_CLASSES:
                cats_exist.add(i)
        return cats_exist

    def get_category_traits(self, category: str):
        """
        Ex. for race, it would return white, black, etc

        Args:
            category: The name of the category

        Returns:
            set: Ex. for race, it would return white, black, etc
        """
        return set(self.df[category])

    def get_category_trait_counts(self, category: str):
        """
        Ex. for race, it would return number of people that are white, black, etc

        Args:
            category: The name of the category

        Returns:
            dict: {trait: count} Ex. for race, it would return number of people that are white, black, etc
        """
        result = {}
        traits = set(self.df[category])  # ex. White, black
        for trait in traits:
            count = self.df[self.df[category] == trait].shape[0]
            result[trait] = count
        return result

    def get_category_trait_fprs(self, category: str):
        """
        Ex. for race, it would return mean fprs of people that are white, black, etc

        Args:
            category: The name of the category

        Returns:
            dict: {trait: mean fpr}
        """
        return self.category_fprs[category]

    def get_category_score(self, category):
        """
        Calculate and return the variance-based bias score for a specific category.

        Parameters:
            category (str): The name of the category to calculate the variance score for.

        Returns:
            float: Variance-based bias score for the specified category, or None if the category is not present.
        """
        if category in self.categories:
            return self.category_scores[category]
        return None

    def get_overall_score(self):
        """
        Calculate an overall bias score across multiple categories in the dataset.

        The score is calculated by averaging scores for each category based on the specified method.

        Returns:
            float: An average score between 0 and 10, where higher values indicate lower bias across categories.

        Notes:
            - The function averages scores calculated for each category, so `calculate_score_by_variance`
              and `calculate_score_by_fpr_mean` should be defined separately in `bias_calculator`.
            - By default, the "variance" method is used. If "accuracy" is selected, it will currently return 0
              until `calculate_score_by_accuracy` is implemented.
            - Assumes each scoring method returns a score between 0 and 10.
        """
        return self.score
