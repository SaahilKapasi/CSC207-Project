"""
score_presenter.py

This module provides the `ScorePresenter` class, which calculates overall bias scores across multiple
categories in a dataset. The class acts as a presentation layer utility, interfacing with the
`bias_calculator` module to compute bias metrics based on various methods such as variance
and mean false positive rates (FPRs).

Classes:
    - ScorePresenter: A class to calculate and present overall bias scores using specified statistical methods.

Methods:
    - get_overall_score(self, method="variance"): Calculates the overall bias score across categories
      based on the specified scoring method.

Usage:
    from score_presenter import ScorePresenter

    # Initialize ScorePresenter
    presenter = ScorePresenter(df, categories)

    # Calculate the overall bias score
    score = presenter.get_overall_score(method="variance")

Dependencies:
    - pandas: The `ScorePresenter` class works with pandas DataFrames to process datasets.
    - bias_calculator: Handles the detailed computation logic for bias scores.
"""

from useCases import bias_calculator

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