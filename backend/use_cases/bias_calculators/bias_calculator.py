"""
bias_calculator.py

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

- calculate_fpr(df): Calculate the false positive rate (FPR) for a subset of infrastructure within a specific category kind.
  This function assumes a DataFrame with 'marked' and 'actual' columns, indicating model prediction and true
  fraud status, respectively.

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
import numpy as np
import pandas as pd


class BiasCalculator:

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
        raise NotImplementedError

    def calculate_score(self, df, category):
        """
        Calculate a bias score based on the variance of false positive rates (FPRs) for a given category.
        The score ranges from 0 to 10, with a lower FPR variance resulting in a higher score.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        category (str): The column name representing the category by which to calculate FPR variance.

        Returns:
        float: A score between 0 and 10, where 10 indicates the lowest possible FPR variance (ideal bias score)
               and 0 indicates the highest possible FPR variance.

        Notes:
        - This function uses the `get_fprs` function to obtain the FPRs for each unique kind in the specified category.
        - The score is calculated by inverting and scaling the FPR variance, such that lower variances yield higher scores.
        - Assumes that FPR values range between 0 and 1, which limits the maximum possible variance to 0.25.
        """
        raise NotImplementedError

    def calculate_fpr(self, df):
        """
        Calculate the false positive rate (FPR) for a given subset of infrastructure.

        Parameters:
        df (pd.DataFrame): The DataFrame containing infrastructure for a single category kind. The DataFrame must include
                           two columns: 'marked' (indicating if a machine learning model marked it as fraud)
                           and 'actual' (indicating if it actually is fraud).

        Returns:
        float: The calculated false positive rate, which is the ratio of false positives to the total number
               of instances in the DataFrame.

        Precondition:
        - The DataFrame `df` contains the columns 'marked' and 'actual'.
        - 'marked' indicates whether the model marked a transaction as fraud (1 for fraud, 0 for not fraud).
        - 'actual' indicates whether the transaction is actually fraud (1 for fraud, 0 for not fraud).
        - The DataFrame only contains infrastructure for *one unique kind* within the relevant category.

        Notes:
        - The false positive rate is calculated as the sum of absolute differences between 'marked' and 'actual'
          divided by the total number of rows in the DataFrame.
        - Assumes no null values are present in the 'marked' or 'actual' columns.
        """
        false_positive_col = abs(df["marked"] - df["actual"])
        return int(false_positive_col.sum()) / len(df)

    def obtain_fpr_set(self, df, category) -> list:
        """
        Calculate the false positive rates (FPRs) for each unique value in the specified category column.

        This function evaluates the false positive rate for each unique value (or "kind") in the specified category
        column of the DataFrame. If the category column is numerical, it groups values based on IQR-defined ranges;
        otherwise, it calculates FPR for each distinct value in the categorical column.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        category (str): The column name in the DataFrame representing the category by which to calculate FPRs.

        Returns:
        set: A set of FPRs, where each FPR corresponds to a unique value in the specified category column.
              Each entry represents the FPR for one unique kind within the category.
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
        Calculate the false positive rates (FPRs) for each unique value in the specified category column.

        This function evaluates the false positive rate for each unique value (or "kind") in the specified category
        column of the DataFrame. If the category column is numerical, it groups values based on IQR-defined ranges;
        otherwise, it calculates FPR for each distinct value in the categorical column.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        category (str): The column name in the DataFrame representing the category by which to calculate FPRs.

        Returns:
        dict: A map of kinds to FPRs {kind: FPR of kind}
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

        Parameters:
            df (pd.DataFrame): The DataFrame containing the data
            column (str): Name of the column to categorize

        Returns:
            pd.DataFrame: DataFrame with new column containing IQR-based categories
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

        choices = [f"0-{q1}", f"{q1}-{q2}", f"{q2}-{q3}", f"{q3}+"]

        df[column] = np.select(conditions, choices)

        df[column] = pd.Categorical(
            df[column],
            categories=choices,
            ordered=True
        )

        return df
