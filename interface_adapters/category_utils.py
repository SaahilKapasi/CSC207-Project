"""
category_utils.py

This module provides utilities for working with protected categories in DataFrames.
It handles category identification and extraction of unique category values.

Functions:
    - get_categories_exist: Identify protected categories present in DataFrame
    - get_kinds: Extract unique values from a DataFrame column
"""

from entites.protected_classes import get_protected_classes

def get_categories_exist(df):
    """
   Identify protected categories that exist as columns in the DataFrame.

   Parameters:
       df (pd.DataFrame): The DataFrame to check for protected categories

   Returns:
       set: Set of column names that match protected classes
   """
    cats_exist = set()
    for i in df.columns:
        if i.lower() in get_protected_classes():
            cats_exist.add(i)
    return cats_exist

def get_kinds(df, column):
    """
    Get unique values from a specified DataFrame column.

    Parameters:
        df (pd.DataFrame): The DataFrame containing the column
        column (str): Name of the column to get unique values from

    Returns:
        set: Set of unique values in the specified column
    """
    return set(df[column])