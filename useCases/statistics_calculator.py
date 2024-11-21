"""
statistics_calculator.py

This module provides functions for calculating basic statistical metrics on columns
in a pandas DataFrame. Each function takes a DataFrame and a column name as input and
returns a specific statistic, such as the mean, median, standard deviation, or outlier bounds.

Functions:
- get_col_mean(df, column): Calculate the mean of a specified column.
- get_col_median(df, column): Calculate the median of a specified column.
- get_col_std(df, column): Calculate the standard deviation of a specified column.
- get_col_q1(df, column): Calculate the first quartile (Q1) of a specified column.
- get_col_q3(df, column): Calculate the third quartile (Q3) of a specified column.
- get_col_iqr(df, column): Calculate the interquartile range (IQR) of a specified column.
- get_col_lower_bound(df, column): Calculate the lower bound for outliers in a specified column.
- get_col_upper_bound(df, column): Calculate the upper bound for outliers in a specified column.

Usage:
    Import this module and call the desired function, passing in a DataFrame and column
    name to compute the relevant statistic. For example:

        from statistics import get_col_mean, get_col_IQR
        mean_value = get_col_mean(df, 'column_name')
        iqr_value = get_col_IQR(df, 'column_name')
"""
import numpy as np


def get_col_mean(df, column):
    """
        Calculate the mean of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the mean.

        Returns:
        float: The mean value of the specified column.
    """
    return df[column].mean()


def get_col_median(df, column):
    """
        Calculate the median of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the median.

        Returns:
        float: The median value of the specified column.
    """
    return df[column].median()


def get_col_std(df, column):
    """
        Calculate the standard deviation of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the standard deviation.

        Returns:
        float: The standard deviation of the specified column.
    """
    return df[column].std()


def get_col_q1(df, column):
    """
    Calculate the first quartile (Q1) of a specified column in a DataFrame.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the infrastructure.
    column (str): The name of the column for which to calculate Q1.

    Returns:
    float: The Q1 (25th percentile) value of the specified column.
    """
    return df[column].quantile(0.25)


def get_col_q3(df, column):
    """
        Calculate the third quartile (Q3) of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate Q3.

        Returns:
        float: The Q3 (75th percentile) value of the specified column.
    """
    return df[column].quantile(0.75)


def get_col_iqr(df, column):
    """
        Calculate the Interquartile Range (IQR) of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the IQR.

        Returns:
        float: The IQR, calculated as Q3 - Q1, of the specified column.
    """
    return get_col_q3(df, column) - get_col_q1(df, column)


def get_col_lower_bound(df, column):
    """
        Calculate the lower bound for outliers in a specified column using the IQR method.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the lower bound.

        Returns:
        float: The lower bound value, below which infrastructure points are considered potential outliers.
    """
    return get_col_q1(df, column) - 1.5 * get_col_iqr(df, column)


def get_col_upper_bound(df, column):
    """
        Calculate the upper bound for outliers in a specified column using the IQR method.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the infrastructure.
        column (str): The name of the column for which to calculate the upper bound.

        Returns:
        float: The upper bound value, above which infrastructure points are considered potential outliers.
    """
    return get_col_q3(df, column) + 1.5 * get_col_iqr(df, column)

def identify_outliers(df, column):
    """
    Identify outliers in a DataFrame column using IQR method.

    Parameters:
        df (pd.DataFrame): The DataFrame containing the data
        column (str): Name of the column to check for outliers

    Returns:
        pd.Series: Series containing the outlier values
    """
    lower_bound = get_col_lower_bound(df, column)
    upper_bound = get_col_upper_bound(df, column)
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers[column]

def remove_outliers(df, column):
    """
    Remove outliers from a DataFrame column.

    Parameters:
        df (pd.DataFrame): The DataFrame containing the data
        column (str): Name of the column to remove outliers from

    Returns:
        pd.DataFrame: DataFrame with outliers removed
    """
    outliers = identify_outliers(df, column)
    df_no_outliers = df[~df[column].isin(outliers)]
    return df_no_outliers

def update_number_kinds_by_irq(df, column):
    """
    Categorize numerical values based on IQR ranges.

    Parameters:
        df (pd.DataFrame): The DataFrame containing the data
        column (str): Name of the column to categorize

    Returns:
        pd.DataFrame: DataFrame with new column containing IQR-based categories
    """
    q1 = get_col_q1(df, column)
    q2 = get_col_mean(df, column)
    q3 = get_col_q3(df, column)

    conditions = [
        (df[column] < q1),
        (df[column] >= q1) & (df[column] < q2),
        (df[column] >= q2) & (df[column] < q3),
        ]

    choices = [f"below_{q1}", f"below_{q2}", f"below_{q3}"]

    new_col_name = f"{column}_categorized_by_iqr"
    df[new_col_name] = np.select(conditions, choices, default=f"above_{q3}")

    return df