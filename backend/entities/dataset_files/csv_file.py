"""
csv_file.py

This module defines the CSVFile class, which is a subclass of DatasetFile.
It represents a dataset file specifically for CSV files and implements methods
for loading and processing CSV data.
"""
from typing import BinaryIO

import pandas as pd
from backend.entities.dataset_files.dataset_file import DatasetFile


class CSVFile(DatasetFile):
    """
    Represents a dataset file specifically for CSV format.

    Inherits from the DatasetFile base class and implements the `load_file`
    method for loading CSV data into a DataFrame.

    Attributes:
        df (pd.DataFrame): The loaded dataset from the CSV file.
        categories (set): A set of categories present in the dataset.
    """

    df: pd.DataFrame
    categories: set

    def load_file(self, file_address: str | BinaryIO) -> None:
        """
        Loads the dataset from a CSV file into a pandas DataFrame.

        Args:
            file_address (BinaryIO): The file object or file-like object pointing to the CSV file.

        Returns:
            None
        """
        self.df = pd.read_csv(file_address)
