"""
variance_calculator.py

This module provides a VarianceCalculator class for calculating bias scores across different categories in a DataFrame.
It extends the BiasCalculator class and focuses on computing scores based on the variance of false positive rates (FPRs) for each category.

Class:
- VarianceCalculator: Inherits from BiasCalculator and implements methods for calculating bias scores based on FPR variance.

Key Methods:
- calculate_overall_score: Calculate an overall bias score across multiple categories.
- calculate_score: Calculate a bias score based on the variance of FPRs for a given category.

Usage:
Import the VarianceCalculator class and use its methods to calculate bias scores for various categories within a DataFrame.

Example:
    from variance_calculator import VarianceCalculator

    calculator = VarianceCalculator()
    score = calculator.calculate_overall_score(df, {'Category1', 'Category2'})

Notes:
- The `calculate_score` method uses FPR variance to compute scores, where lower variance results in a higher score.
- Inherits methods from BiasCalculator for FPR calculations and data preprocessing.

Dependencies:
- Inherits from backend.use_cases.bias_calculators.bias_calculator.BiasCalculator
- Uses numpy (np) for variance calculations.
"""
from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator
import numpy as np


class AccuracyCalculator(BiasCalculator):
    def calculate_overall_score(self, df, categories: set):
        """
     Calculate an overall bias score across multiple categories in a DataFrame.

     This method computes an average score for the specified categories, where each
     category's score is based on the variance of false positive rates (FPRs).

     Args:
         df (pd.DataFrame): The DataFrame containing the infrastructure data.
         categories (set): A set of column names representing the categories to calculate scores for.

     Returns:
         float: An average score between 0 and 10, where higher values indicate lower bias across categories.

     Note:
         - The function averages scores calculated for each category using the `calculate_score` method.
         - Assumes each scoring method returns a score between 0 and 10.
     """
        ave_score = 0
        for category in categories:
            ave_score += self.calculate_score(df, category)
        return ave_score / len(categories)

    def calculate_score(self, df, category):
        """
     Calculate a bias score based on the variance of false positive rates (FPRs) for a given category.

     Args:
         df (pd.DataFrame): The DataFrame containing the infrastructure data.
         category (str): The column name representing the category for FPR variance calculation.

     Returns:
         float: A score between 0 and 10, where 10 indicates the lowest possible FPR variance
                (ideal bias score) and 0 indicates the highest possible FPR variance.

     Note:
         - Uses the `obtain_fpr_set` method to get FPRs for each unique kind in the specified category.
         - The score is calculated by inverting and scaling the FPR variance.
         - Assumes FPR values range between 0 and 1, limiting the maximum possible variance to 0.25.

     """
        # Step 1: Calculate the mean of FPRs
        kind_fprs = self.obtain_fpr_set(df, category)
        ave_fpr = np.mean(kind_fprs)

        # Step 2: Define a maximum threshold for average FPRs
        max_fpr_threshold = 1.0  # As FPRs range between 0 and 1

        # Step 3: Invert and scale the mean FPR to a score from 0 to 10
        score = max(0, min(10, 10 * (1 - ave_fpr / max_fpr_threshold)))

        return score
