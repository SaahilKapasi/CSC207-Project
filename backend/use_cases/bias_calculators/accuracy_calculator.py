"""
accuracy_calculator.py

This module defines the `AccuracyCalculator` class, a subclass of `BiasCalculator`.

The `AccuracyCalculator` evaluates dataset bias by:
- Calculating the mean of false positive rates (FPRs) for each category.
- Mapping the mean FPR to a bias score, scaled between 0 and 10.
"""

from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator
import numpy as np


class AccuracyCalculator(BiasCalculator):
    """
    A concrete implementation of `BiasCalculator` that evaluates bias based on mean FPR.

    Attributes:
        None specific to this class.
    """

    def calculate_overall_score(self, df, categories: set) -> float:
        """
        Calculates the overall bias score for the dataset as the average of individual category scores.

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            categories (set): The set of categories in the dataset.

        Returns:
            float: The overall bias score, scaled between 0 and 10.
        """
        ave_score = 0
        for category in categories:
            ave_score += self.calculate_score(df, category)
        return ave_score / len(categories)

    def calculate_score(self, df, category: str) -> float:
        """
        Calculates the bias score for a specific category based on the mean FPR.

        The score is determined by:
        - Calculating the mean FPR for the traits in the category.
        - Scaling and inverting the mean FPR to a score between 0 (high bias) and 10 (low bias).

        Steps:
        1. Calculate the mean of FPRs for traits in the category.
        2. Define a maximum threshold for average FPRs (`max_fpr_threshold = 1.0`).
        3. Scale and invert the mean FPR to produce a score in the range [0, 10].

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            category (str): The category to calculate the bias score for.

        Returns:
            float: The calculated bias score for the category.
        """
        # Step 1: Calculate the mean of FPRs
        kind_fprs = self.obtain_fpr_set(df, category)
        ave_fpr = np.mean(kind_fprs)

        # Step 2: Define a maximum threshold for average FPRs
        max_fpr_threshold = 1.0  # As FPRs range between 0 and 1

        # Step 3: Invert and scale the mean FPR to a score from 0 to 10
        score = max(0, min(10, 10 * (1 - ave_fpr / max_fpr_threshold)))

        return score
