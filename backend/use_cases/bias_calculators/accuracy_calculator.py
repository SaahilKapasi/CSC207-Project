"""
variance_calculator.py

This module provides functions for calculating bias scores across different categories in a DataFrame.
It includes methods for computing scores based on various metrics, including variance and mean of
false positive rates (FPRs) for each category, with options to extend for accuracy-based scoring.

Functions:
- calculate_overall_score(df, categories, method="variance"): Calculate an overall bias score by averaging
  individual scores for each category using the specified method ("variance", "fpr_mean", or "accuracy").

- calculate_score_by_variance(df, category): Calculate a bias score from the variance of FPRs for a given
  category. Lower FPR variance results in a higher score, ranging from 0 to 10.

- calculate_score_by_fpr_mean(df, category): Calculate a bias score based on the mean of FPRs for a given
  category, where a lower mean FPR results in a higher score from 0 to 10.

- calculate_score_by_accuracy(df, category): Placeholder function for calculating a score based on accuracy.
  Currently not implemented.

- calculate_fpr(df): Calculate the false positive rate (FPR) for a subset of infrastructure within a specific
category kind. This function assumes a DataFrame with 'marked' and 'actual' columns, indicating model prediction and
true fraud status, respectively.

- obtain_fpr_set(df, category): Calculate the FPRs for each unique kind within a specified category, returning
  a set of FPRs for use in other scoring functions.

Usage:
    Import this module and use the functions to calculate bias scores for various categories within a DataFrame.
    For example, to calculate an overall score based on the variance of FPRs for a set of categories:

        from bias_calculator import calculate_overall_score
        score = calculate_overall_score(df, {'Category1', 'Category2'}, method="variance")

Notes:
- `calculate_overall_score` supports different methods for scoring based on FPR statistics, defaulting to variance.
- The `calculate_fpr` function assumes no null values in 'marked' or 'actual' columns.
- For "accuracy"-based scoring, the function `calculate_score_by_accuracy` is a placeholder and requires implementation.

Dependencies:
- Relies on the `helpers.get_cat_kinds` function from the `analysis.helpers` module to retrieve unique kinds.
- Uses numpy (`np`) for mean and variance calculations.
"""
from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator
import numpy as np


class AccuracyCalculator(BiasCalculator):
    def calculate_overall_score(self, df, categories: set):
        """
        Calculate an overall bias score across multiple categories in a DataFrame.
        The score is calculated by averaging scores for each category based on the specified method.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        categories (set): A set of column names representing the categories to calculate scores for.
        method (str): The method used to calculate individual category scores. Options are:
                      - "variance": Uses variance of FPRs for each category.
                      - "fpr_mean": Uses mean of FPRs for each category.
                      - "accuracy": (Optional) Placeholder for calculating based on accuracy.

        Returns:
        float: An average score between 0 and 10, where higher values indicate lower bias across categories.

        Notes:
        - The function averages scores calculated for each category, so `calculate_score_by_variance`
          and `calculate_score_by_fpr_mean` should be defined separately.
        - By default, the "variance" method is used. If "accuracy" is selected, it will currently return 0
          until `calculate_score_by_accuracy` is implemented.
        - Assumes each scoring method returns a score between 0 and 10.
        """
        ave_score = 0
        for category in categories:
            ave_score += self.calculate_score(df, category)
        return ave_score / len(categories)

    def calculate_score(self, df, category):
        """
        Calculate a bias score based on the mean false positive rate (FPR) for a given category.
        The score ranges from 0 to 10, where a lower mean FPR results in a higher score.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        category (str): The column name representing the category by which to calculate FPRs.

        Returns:
        float: A score between 0 and 10, where 10 indicates the lowest possible mean FPR (ideal bias score)
               and 0 indicates the highest possible mean FPR.

        Notes:
        - This function uses the `get_fprs` function to obtain the FPRs for each unique kind in the specified category.
        - The score is calculated by inverting and scaling the mean FPR, such that lower mean FPRs yield higher scores.
        - Assumes FPR values range between 0 and 1, with a maximum threshold of 1.
        """
        # Step 1: Calculate the mean of FPRs
        kind_fprs = self.obtain_fpr_set(df, category)
        ave_fpr = np.mean(kind_fprs)

        # Step 2: Define a maximum threshold for average FPRs
        max_fpr_threshold = 1.0  # As FPRs range between 0 and 1

        # Step 3: Invert and scale the mean FPR to a score from 0 to 10
        score = max(0, min(10, 10 * (1 - ave_fpr / max_fpr_threshold)))

        return score
