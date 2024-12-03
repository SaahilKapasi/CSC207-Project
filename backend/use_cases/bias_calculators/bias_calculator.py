"""
bias_calculator.py

This module defines the `BiasCalculator` class, which provides methods to calculate bias metrics for datasets.

The `BiasCalculator` is responsible for:
- Calculating overall dataset bias scores.
- Determining bias scores for individual categories.
- Processing false positive rates (FPRs) for category-specific traits.
- Categorizing numerical data into quartile-based ranges for FPR calculation.
"""

import numpy as np
import pandas as pd
from backend.entities.dataset_files.dataset_file import DatasetFile


class BiasCalculator:
    """
    A base class for calculating bias metrics in datasets.

    This class provides methods for processing datasets, calculating overall and category-specific
    scores, and analyzing false positive rates (FPRs) for different traits.

    Methods `calculate_overall_score` and `calculate_score` must be implemented by subclasses.
    """

    def calculate_overall_score(self, df: pd.DataFrame, categories: set) -> float:
        """
        Calculates the overall bias score for the dataset.

        This method must be implemented by subclasses.

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            categories (set): The set of categories in the dataset.

        Returns:
            float: The overall bias score.

        Raises:
            NotImplementedError: If not implemented in a subclass.
        """
        raise NotImplementedError

    def calculate_score(self, df: pd.DataFrame, category: str) -> float:
        """
        Calculates the bias score for a specific category.

        This method must be implemented by subclasses.

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            category (str): The category to calculate the bias score for.

        Returns:
            float: The bias score for the category.

        Raises:
            NotImplementedError: If not implemented in a subclass.
        """
        raise NotImplementedError

    def process_dataset(self, dataset: DatasetFile) -> None:
        """
        Processes the dataset to calculate bias scores and false positive rates (FPRs).

        Args:
            dataset (DatasetFile): The dataset object to process.

        Updates:
            - Calculates and assigns the overall dataset score.
            - Calculates and assigns scores for individual categories.
            - Generates FPR maps for traits in each category.
            - Marks the dataset as processed.
        """
        dataset.score = self.calculate_overall_score(dataset.df, dataset.categories)
        dataset.category_scores = {category: self.calculate_score(dataset.df, category)
                                   for category in dataset.categories}
        dataset.category_fprs = {category: self.obtain_fpr_map(dataset.df, category) for category in dataset.categories}
        dataset.is_processed = True

    def calculate_fpr(self, df: pd.DataFrame) -> float:
        """
        Calculates the false positive rate (FPR) for a subset of the dataset.

        The FPR is calculated as the proportion of mismatches between "marked" and "actual" values.

        Args:
            df (pd.DataFrame): The subset of the dataset to analyze.

        Returns:
            float: The calculated FPR.
        """
        false_positive_col = abs(df["marked"] - df["actual"])
        return int(false_positive_col.sum()) / len(df)

    def obtain_fpr_set(self, df: pd.DataFrame, category: str) -> list[float]:
        """
        Calculates FPRs for all unique values (traits) in a given category.

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            category (str): The category to calculate FPRs for.

        Returns:
            list[float]: A list of FPRs for each trait in the category.
        """
        if np.issubdtype(df[category].dtype, np.number):
            df = self.update_number_kinds_by_irq(df, category)

        kinds = set(df[category])
        kind_fprs = []

        for kind in kinds:
            kind_fpr = self.calculate_fpr(df[df[category] == kind])
            kind_fprs.append(kind_fpr)

        return kind_fprs

    def obtain_fpr_map(self, df: pd.DataFrame, category: str) -> dict[str, float]:
        """
        Generates a mapping of traits to their FPRs for a given category.

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            category (str): The category to calculate FPRs for.

        Returns:
            dict[str, float]: A dictionary mapping traits to their FPRs.
        """
        if np.issubdtype(df[category].dtype, np.number):
            df = self.update_number_kinds_by_irq(df, category)

        kinds = set(df[category])
        result = {}

        for kind in kinds:
            kind_fpr = self.calculate_fpr(df[df[category] == kind])
            result[kind] = kind_fpr

        return result

    def update_number_kinds_by_irq(self, df: pd.DataFrame, column: str) -> pd.DataFrame:
        """
        Converts a numerical column into quartile-based ranges for categorical analysis.

        The numerical values are replaced with range labels based on interquartile range (IQR).

        Args:
            df (pd.DataFrame): The dataset as a pandas DataFrame.
            column (str): The numerical column to process.

        Returns:
            pd.DataFrame: The dataset with the updated column.
        """
        q1 = round(df[column].quantile(0.25))
        q2 = round(df[column].quantile(0.50))
        q3 = round(df[column].quantile(0.75))

        conditions = [
            (df[column] < q1),
            (df[column] >= q1) & (df[column] < q2),
            (df[column] >= q2) & (df[column] < q3),
            (df[column] >= q3)
        ]

        choices = [f"0-{q1 - 1}", f"{q1}-{q2 - 1}", f"{q2}-{q3 - 1}", f"{q3}+"]

        df[column] = np.select(conditions, choices)

        return df
