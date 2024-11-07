"""
file_analysis.py

This module defines a File class, used to handle a dataset and calculate bias scores based on protected categories.
The File class provides methods for calculating bias scores using different statistical measures, such as variance
and mean-based false positive rates (FPRs), across specified protected categories in the dataset.

Classes:
    File: Represents a dataset, calculates category-specific bias scores, and computes an overall bias score
          across multiple categories using various scoring methods.

Dependencies:
    - pandas: For handling data operations on DataFrames.
    - helpers: Contains utility functions for identifying protected categories in a DataFrame.
    - bias_calculator: Contains functions for calculating individual and overall bias scores.

Usage:
    Create a File instance by providing the file path of a CSV dataset.
    Use instance methods to retrieve bias scores for specific categories or an overall score.
"""
from analysis import helpers, bias_calculator
import pandas as pd


class File:
    """
    A class for handling and calculating bias scores for a dataset with protected categories.

    Attributes:
        df (pd.DataFrame): The DataFrame containing the dataset.
        categories (set): A set of protected categories present in the dataset.
        score (float): Default overall variance score for the dataset when initialized.

    Methods:
        get_category_var_score(category): Get the variance-based bias score for a specific category.
        get_category_mean_score(category): Get the mean-based bias score for a specific category.
        get_overall_score(method): Calculate the overall bias score across categories based on the specified method.
    """
    df: pd.DataFrame
    categories: set
    score: float    # default variance when initialized

    def __init__(self, file_address):
        self.df = pd.read_csv(file_address)
        self.categories = helpers.get_categories_exist(self.df)
        self.score = bias_calculator.calculate_overall_score(self.df, self.categories)

    def get_category_var_score(self, category):
        """
        Calculate and return the variance-based bias score for a specific category.

        Parameters:
            category (str): The name of the category to calculate the variance score for.

        Returns:
            float: Variance-based bias score for the specified category, or None if the category is not present.
        """
        if category in self.categories:
            return bias_calculator.calculate_score_by_variance(self.df, category)
        return None

    def get_category_mean_score(self, category):
        """
        Calculate and return the mean-based bias score for a specific category.

        Parameters:
            category (str): The name of the category to calculate the mean score for.

        Returns:
            float: Mean-based bias score for the specified category, or None if the category is not present.
        """
        if category in self.categories:
            return bias_calculator.calculate_score_by_fpr_mean(self.df, category)
        return None

    def get_overall_score(self, method="variance"):
        """
        Calculate an overall bias score across multiple categories in the dataset.

        The score is calculated by averaging scores for each category based on the specified method.

        Parameters:
            method (str): The method used to calculate individual category scores. Options are:
                          - "variance": Uses variance of FPRs for each category.
                          - "fpr_mean": Uses mean of FPRs for each category.
                          - "accuracy": Placeholder for calculating based on accuracy (returns 0 by default).

        Returns:
            float: An average score between 0 and 10, where higher values indicate lower bias across categories.

        Notes:
            - The function averages scores calculated for each category, so `calculate_score_by_variance`
              and `calculate_score_by_fpr_mean` should be defined separately in `bias_calculator`.
            - By default, the "variance" method is used. If "accuracy" is selected, it will currently return 0
              until `calculate_score_by_accuracy` is implemented.
            - Assumes each scoring method returns a score between 0 and 10.
        """
        return bias_calculator.calculate_overall_score(self.df, self.categories, method=method)
