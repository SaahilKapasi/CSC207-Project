"""
data_filters.py

This module provides functionality for filtering and manipulating DataFrame data.
It contains utilities for generating filter criteria and applying filters to DataFrames.

Functions:
    - generate_filter_criteria: Generate combinations of filter criteria from DataFrame columns
    - filter_dataframe: Apply filter criteria to DataFrame
"""

import itertools

def generate_filter_criteria(df, columns):
    """
   Generate all possible combinations of filter criteria from specified columns.

   Parameters:
       df (pd.DataFrame): The DataFrame to generate criteria from
       columns (list): List of column names to generate criteria for

   Returns:
       list: List of dictionaries, each containing a unique combination of column values
   """

    unique_values = [df[column].unique() for column in columns]
    criteria_combinations = list(itertools.product(*unique_values))
    return [dict(zip(columns, combination)) for combination in criteria_combinations]

def filter_dataframe(df, filter_criteria):
    """
   Filter DataFrame based on provided criteria.

   Parameters:
       df (pd.DataFrame): The DataFrame to filter
       filter_criteria (dict): Dictionary mapping column names to desired values

   Returns:
       pd.DataFrame: Filtered DataFrame containing only rows matching the criteria
   """
    filtered_df = df.copy(deep=True)
    for column, value in filter_criteria.items():
        filtered_df = filtered_df[filtered_df[column] == value]
    return filtered_df