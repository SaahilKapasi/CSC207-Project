"""
bias_calculator.py

This module provides a BiasCalculator class for calculating bias scores across different categories in a DataFrame.
It includes methods for computing scores based on false positive rates (FPRs) for each category.

Class:
- BiasCalculator: Contains methods for calculating bias scores and FPRs.

Key Methods:
- calculate_overall_score: Calculate an overall bias score across multiple categories.
- calculate_score: Calculate a bias score based on the variance of FPRs for a given category.
- calculate_fpr: Calculate the false positive rate for a subset of infrastructure.
- obtain_fpr_set: Calculate FPRs for each unique value in a specified category column.
- obtain_fpr_map: Calculate FPRs for each unique value and return as a dictionary.
- update_number_kinds_by_irq: Categorize numerical values based on IQR ranges.

Usage:
Import the BiasCalculator class and use its methods to calculate bias scores for various categories within a DataFrame.

Example:
    from bias_calculator import BiasCalculator

    calculator = BiasCalculator()
    score = calculator.calculate_overall_score(df, {'Category1', 'Category2'})

Notes:
- The `calculate_fpr` function assumes no null values in 'marked' or 'actual' columns.
- Numerical categories are automatically grouped based on IQR-defined ranges.

Dependencies:
- numpy (np) for calculations and data type checking.
"""
import numpy as np


class BiasCalculator:

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

    Raises:
        NotImplementedError: This method is not yet implemented.

    Note:
        - The function averages scores calculated for each category.
        - Assumes each scoring method returns a score between 0 and 10.
    """
        raise NotImplementedError

    def calculate_score(self, df, category):
        """
     Calculate a bias score based on the variance of false positive rates (FPRs) for a given category.

     Args:
         df (pd.DataFrame): The DataFrame containing the infrastructure data.
         category (str): The column name representing the category for FPR variance calculation.

     Returns:
         float: A score between 0 and 10, where 10 indicates the lowest possible FPR variance
                (ideal bias score) and 0 indicates the highest possible FPR variance.

     Raises:
         NotImplementedError: This method is not yet implemented.

     Note:
         - Uses the `obtain_fpr_set` method to get FPRs for each unique kind in the specified category.
         - The score is calculated by inverting and scaling the FPR variance.
         - Assumes FPR values range between 0 and 1, limiting the maximum possible variance to 0.25.
     """
        raise NotImplementedError

    def calculate_fpr(self, df):
        """
    Calculate the false positive rate (FPR) for a given subset of infrastructure.

    Args:
        df (pd.DataFrame): The DataFrame containing infrastructure for a single category kind.
                           Must include 'marked' and 'actual' columns.

    Returns:
        float: The calculated false positive rate.

    Preconditions:
        - The DataFrame `df` contains the columns 'marked' and 'actual'.
        - 'marked' indicates model predictions (1 for fraud, 0 for not fraud).
        - 'actual' indicates true fraud status (1 for fraud, 0 for not fraud).
        - The DataFrame only contains infrastructure for one unique kind within the relevant category.

    Note:
        - FPR is calculated as (sum of absolute differences between 'marked' and 'actual') / (total rows).
        - Assumes no null values in 'marked' or 'actual' columns.
    """
        false_positive_col = abs(df["marked"] - df["actual"])
        return int(false_positive_col.sum()) / len(df)

    def obtain_fpr_set(self, df, category) -> list:
        """
    Calculate false positive rates (FPRs) for each unique value in the specified category column.

    Args:
        df (pd.DataFrame): The DataFrame containing the infrastructure data.
        category (str): The column name representing the category for FPR calculation.

    Returns:
        list: A list of FPRs, each corresponding to a unique value in the specified category column.

    Note:
        - For numerical categories, values are grouped based on IQR-defined ranges.
        - For categorical columns, FPR is calculated for each distinct value.
    """
        if np.issubdtype(df[category].dtype, np.number):
            # Replace helpers reference with direct import
            df = self.update_number_kinds_by_irq(df, category)

        # Replace helpers reference with direct import
        kinds = set(df[category])
        kind_fprs = []

        for kind in kinds:
            kind_fpr = self.calculate_fpr(df[df[category] == kind])
            kind_fprs.append(kind_fpr)

        return kind_fprs

    def obtain_fpr_map(self, df, category) -> dict[str, float]:
        """
    Calculate false positive rates (FPRs) for each unique value in the specified category column.

    Args:
        df (pd.DataFrame): The DataFrame containing the infrastructure data.
        category (str): The column name representing the category for FPR calculation.

    Returns:
        dict: A map of kinds to FPRs {kind: FPR of kind}.

    Note:
        - For numerical categories, values are grouped based on IQR-defined ranges.
        - For categorical columns, FPR is calculated for each distinct value.
    """
        if np.issubdtype(df[category].dtype, np.number):
            df = self.update_number_kinds_by_irq(df, category)

        kinds = set(df[category])
        result = {}

        for kind in kinds:
            kind_fpr = self.calculate_fpr(df[df[category] == kind])
            result[kind] = kind_fpr

        return result

    def update_number_kinds_by_irq(self, df, column):
        """
    Categorize numerical values based on IQR ranges.

    Args:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): Name of the column to categorize.

    Returns:
        pd.DataFrame: DataFrame with a new column containing IQR-based categories.

    Note:
        - Creates categories based on quartiles: below Q1, Q1-Q2, Q2-Q3, and above Q3.
    """
        q1 = df[column].quantile(0.25)
        q2 = df[column].quantile(0.50)
        q3 = df[column].quantile(0.75)

        conditions = [
            (df[column] < q1),
            (df[column] >= q1) & (df[column] < q2),
            (df[column] >= q2) & (df[column] < q3),
        ]

        choices = [f"below_{q1}", f"below_{q2}", f"below_{q3}"]

        new_col_name = f"{column}_categorized_by_iqr"
        df[new_col_name] = np.select(conditions, choices, default=f"above_{q3}")

        return df
