"""
file_analysis.py

This module defines a File class, used to handle a dataset and calculate bias scores based on protected categories.
The File class provides methods for calculating bias scores using different statistical measures, such as variance
and mean-based false positive rates (FPRs), across specified protected categories in the dataset.

Classes:
    File: Represents a dataset, calculates category-specific bias scores, and computes an overall bias score
          across multiple categories using various scoring methods.

Dependencies:
    - pandas: For handling infrastructure operations on DataFrames.
    - helpers: Contains utility functions for identifying protected categories in a DataFrame.
    - bias_calculator: Contains functions for calculating individual and overall bias scores.

Usage:
    Create a File instance by providing the file path of a CSV dataset.
    Use instance methods to retrieve bias scores for specific categories or an overall score.
"""
from backend.entities.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator
from typing import BinaryIO
import pandas as pd


class CSVFile(DatasetFile):
    """
    A class for handling and calculating bias scores for a dataset with protected categories.

    Attributes:
        df (pd.DataFrame): The DataFrame containing the dataset.
        categories (set): A set of protected categories present in the dataset.

    """
    df: pd.DataFrame
    categories: set

    def load_file(self, file_address: BinaryIO):
        self.df = pd.read_csv(file_address)
