"""
    A class for calculating bias scores across different categories in a DataFrame.

    This class extends the BiasCalculator and provides methods for computing scores
    based on the variance of false positive rates (FPRs) for each category.

    Attributes:
        Inherits attributes from BiasCalculator.

    Methods:
        calculate_overall_score(df, categories): Calculate an overall bias score across multiple categories.
        calculate_score(df, category): Calculate a bias score for a single category based on FPR variance.
    """
from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator
import numpy as np


class VarianceCalculator(BiasCalculator):
    def calculate_overall_score(self, df, categories: set):
        """
    Calculate an overall bias score across multiple categories in a DataFrame.

    Args:
        df (pd.DataFrame): The DataFrame containing the infrastructure data.
        categories (set): A set of column names representing the categories to calculate scores for.

    Returns:
        float: An average score between 0 and 10, where higher values indicate lower bias across categories.

    Notes:
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
        category (str): The column name representing the category by which to calculate FPR variance.

    Returns:
        float: A score between 0 and 10, where 10 indicates the lowest possible FPR variance (ideal bias score)
               and 0 indicates the highest possible FPR variance.

    Notes:
        - This method uses the `obtain_fpr_set` method to get FPRs for each unique kind in the specified category.
        - The score is calculated by inverting and scaling the FPR variance, with lower variances yielding higher scores.
        - Assumes that FPR values range between 0 and 1, limiting the maximum possible variance to 0.25.
    """

        # Step 1: Calculate the variance of FPRs
        kind_fprs = self.obtain_fpr_set(df, category)
        fpr_variance = np.var(kind_fprs)

        # Step 2: Define the max variance threshold you want to scale within
        max_variance = 0.25  # since FPRs range between 0 and 1, max spread variance is 0.25

        # Step 3: Invert and scale the variance to a score from 0 to 10
        # Calculate a raw score within a range of 0 to 10
        score = max(0, min(10, 10 * (1 - fpr_variance / max_variance)))

        return score
