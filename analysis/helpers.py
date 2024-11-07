"""
helpers.py

This module provides utility functions for analyzing data related to protected classes.
Functions include generating filter criteria, filtering DataFrames based on criteria, identifying and
removing outliers, calculating summary statistics, and categorizing numerical data based on the Interquartile Range.
"""

import itertools
import pandas as pd
from . import statistics as st
import numpy as np


def get_protected_classes():
    """
    Retrieve a set of protected classes as defined in regulatory or policy contexts.

    This function returns a set containing names of protected classes, which are categories
    often used to ensure non-discriminatory practices in areas such as employment, housing,
    and public accommodations.

    Returns:
        set: A set of strings, each representing a protected class (e.g., 'citizenship', 'race').
    """
    protected_classes = {
        "citizenship",
        "sex",
        "pregnancy",
        "race",
        "family status",
        "place of origin",
        "marital status",
        "ethnic origin",
        "sexual orientation",
        "color",
        "gender identity",
        "ancestry",
        "gender expression",
        "disability",
        "receipt of public assistance (in housing)",
        "age",
        "record of offenses (in employment)",
        "creed"
    }
    return protected_classes


# Function to generate filter criteria based on unique values of input columns
def generate_filter_criteria(df, columns):
    """
    Generate all possible combinations of filter criteria based on unique values in the specified columns.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    columns (list): A list of column names to generate filter criteria from.

    Returns:
    list: A list of dictionaries, each representing a unique set of filter criteria.
    """
    # Extract unique values for each specified column
    unique_values = [df[column].unique() for column in columns]

    # Generate all possible combinations of these unique values
    criteria_combinations = list(itertools.product(*unique_values))

    # Convert each combination into a dictionary
    # For example, if columns = ['Race', 'Gender'] and combination = ('White', 'Female'),
    # then zip(columns, combination) produces ('Race', 'White') and ('Gender', 'Female').
    filter_criterias = [dict(zip(columns, combination)) for combination in criteria_combinations]

    return filter_criterias


def filter_dataframe(df, filter_criteria):
    """
    Filter the DataFrame based on a dictionary of attribute criteria.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    filter_criteria (dict): A dictionary where keys are column names and values are the values to match.

    Returns:
    pd.DataFrame: A filtered DataFrame that matches the criteria.
    """
    filtered_df = df.copy(deep=True)
    for column, value in filter_criteria.items():
        filtered_df = filtered_df[filtered_df[column] == value]
    return filtered_df


def identify_outliers(df, column):
    """
    Identify potential outliers in a specified column using the IQR method.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name for which to identify outliers.

    Returns:
    pd.Series: A series containing the outlier values.
    """
    lower_bound = st.get_col_lower_bound(df, column)
    upper_bound = st.get_col_upper_bound(df, column)

    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers[column]


def remove_outliers(df, column):
    """
    Remove outliers from the DataFrame based on the output of the identify_outliers function.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name from which to remove outliers.

    Returns:
    pd.DataFrame: A new DataFrame with the identified outliers removed.
    """
    outliers = identify_outliers(df, column)
    # Filter the DataFrame to exclude the identified outliers
    df_no_outliers = df[~df[column].isin(outliers)]
    return df_no_outliers


def calculate_summary_statistics(df, column):
    """
    Calculate key summary statistics for a specified column in a DataFrame.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name for which to calculate the statistics.

    Returns:
    pd.Series: A series containing the mean, median, and standard deviation.
    """
    summary = pd.Series({
        'Mean': st.get_col_mean(df, column),
        'Median': st.get_col_median(df, column),
        'Standard Deviation': st.get_col_std(df, column)
    })
    return summary


def get_categories_exist(df):
    """
    Identify protected categories that exist as columns in the provided DataFrame.

    This function checks if each column in the DataFrame matches a protected class
    listed in `constants.protected_classes`. If a match is found, the column name is
    added to the resulting set of existing protected categories.

    Parameters:
    df (pd.DataFrame): The DataFrame to check for protected category columns.

    Returns:
    set: A set of column names in the DataFrame that match protected classes.
    """
    cats_exist = set()
    for i in df.columns:
        if i.lower() in get_protected_classes():
            cats_exist.add(i)
    return cats_exist


def get_kinds(df, column) -> set:
    """
    Get the unique values (kinds) for a specified column in the DataFrame.

    This function extracts all unique values in the specified column, which represent
    different categories or kinds within that column.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The name of the column to retrieve unique values from.

    Returns:
    set: A set of unique values found in the specified column.
    """
    set_of_kinds = set(df[column])
    return set_of_kinds


def update_number_kinds_by_irq(df, column) -> pd.DataFrame:
    """
    Categorize numerical values in a column based on Interquartile Range (IQR) and add them as a new column.

    This function divides the values in the specified numerical column into distinct categories based on
    IQR thresholds (Q1, mean as Q2, and Q3). It labels values as follows:
      - Below Q1: "below_<Q1>"
      - Between Q1 and Q2: "below_<Q2>"
      - Between Q2 and Q3: "below_<Q3>"
      - Above Q3: "above_<Q3>"

    The categorized values are assigned to a new column in the DataFrame with the suffix "_categorized_by_iqr".

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The name of the numerical column to categorize based on IQR.

    Returns:
    pd.DataFrame: The DataFrame with an added column for categorized IQR values.
    """
    q1 = st.get_col_q1(df, column)
    q2 = st.get_col_mean(df, column)
    q3 = st.get_col_q3(df, column)
    conditions = [
        (df["age"] < q1),
        (df["age"] >= q1) & (df["age"] < q2),
        (df["age"] >= q2) & (df["age"] < q3)
    ]

    choices = ["below_" + str(q1), "below_" + str(q2), "below_" + str(q3)]

    # Use np.select to assign the labels based on conditions
    new_col_name = column + "_categorized_by_iqr"
    df[new_col_name] = np.select(conditions, choices, default="above_" + str(q3))
    return df


# TODO: def find_protected_categories'_names: return set of names (potentially using ai tools to identify this?
# TODO: def convert_crt_names_to_protected_cat_format: void
