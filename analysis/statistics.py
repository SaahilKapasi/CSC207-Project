"""
statistics.py

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
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the mean.

        Returns:
        float: The mean value of the specified column.
    """
    return df[column].mean()


def get_col_median(df, column):
    """
        Calculate the median of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the median.

        Returns:
        float: The median value of the specified column.
    """
    return df[column].median()


def get_col_std(df, column):
    """
        Calculate the standard deviation of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the standard deviation.

        Returns:
        float: The standard deviation of the specified column.
    """
    return df[column].std()


def get_col_q1(df, column):
    """
    Calculate the first quartile (Q1) of a specified column in a DataFrame.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The name of the column for which to calculate Q1.

    Returns:
    float: The Q1 (25th percentile) value of the specified column.
    """
    return df[column].quantile(0.25)


def get_col_q3(df, column):
    """
        Calculate the third quartile (Q3) of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate Q3.

        Returns:
        float: The Q3 (75th percentile) value of the specified column.
    """
    return df[column].quantile(0.75)


def get_col_iqr(df, column):
    """
        Calculate the Interquartile Range (IQR) of a specified column in a DataFrame.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the IQR.

        Returns:
        float: The IQR, calculated as Q3 - Q1, of the specified column.
    """
    return get_col_q3(df, column) - get_col_q1(df, column)


def get_col_lower_bound(df, column):
    """
        Calculate the lower bound for outliers in a specified column using the IQR method.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the lower bound.

        Returns:
        float: The lower bound value, below which data points are considered potential outliers.
    """
    return get_col_q1(df, column) - 1.5 * get_col_iqr(df, column)


def get_col_upper_bound(df, column):
    """
        Calculate the upper bound for outliers in a specified column using the IQR method.

        Parameters:
        df (pd.DataFrame): The DataFrame containing the data.
        column (str): The name of the column for which to calculate the upper bound.

        Returns:
        float: The upper bound value, above which data points are considered potential outliers.
    """
    return get_col_q3(df, column) + 1.5 * get_col_iqr(df, column)
