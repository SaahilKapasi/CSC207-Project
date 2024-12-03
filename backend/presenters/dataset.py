"""
dataset.py

This module provides functions for handling datasets and comparisons within the backend.

It supports:
- Storing and retrieving datasets and their comparisons.
- Processing uploaded dataset files to calculate fairness metrics.
- Generating structured representations of datasets with scores and analyses.

Dependencies include modules for file handling, bias analysis, and bias calculations.
"""

import uuid
from fastapi import UploadFile
from backend.entities.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_analyzers.simple_analyzer import SimpleAnalyzer
from backend.use_cases.bias_calculators.variance_calculator import VarianceCalculator

# In-memory storage for datasets and comparisons
past_datasets = {}
past_comparisons = {}


async def get_comparison(id: str) -> str | dict:
    """
    Retrieves a previously stored comparison by its unique ID.

    Args:
        id (str): The unique identifier for the comparison.

    Returns:
        str | dict: The comparison data if found, or "Missing" if the ID is not in storage.
    """
    if id not in past_comparisons:
        return "Missing"
    else:
        return past_comparisons[id]


async def get_dataset(id: str) -> str | dict:
    """
    Retrieves a previously stored dataset by its unique ID.

    Args:
        id (str): The unique identifier for the dataset.

    Returns:
        str | dict: The dataset information if found, or "Missing" if the ID is not in storage.
    """
    if id not in past_datasets:
        return "Missing"
    else:
        return past_datasets[id]


async def save_comparison(data) -> str:
    """
    Saves a comparison and generates a unique ID for it.

    Args:
        data: The comparison data to store.

    Returns:
        str: The unique identifier for the stored comparison.
    """
    id = str(uuid.uuid4())
    past_comparisons[id] = data
    return id


async def generate_dataset(file: UploadFile) -> dict:
    """
    Processes an uploaded dataset file and generates a structured representation.

    The function:
    - Parses the file into a `DatasetFile` object.
    - Calculates bias metrics using `BiasCalculator`.
    - Analyzes dataset fairness using `BiasAnalyzer`.
    - Constructs a structured representation of the dataset including categories, scores, and descriptions.

    Args:
        file (UploadFile): The uploaded file to process.

    Returns:
        dict: A structured dataset representation containing its ID, name, categories, scores, and analysis.
    """
    calculator = VarianceCalculator()
    dataset_file = CSVFile(file.file)
    calculator.process_dataset(dataset_file)
    analyzer = SimpleAnalyzer(dataset_file)
    categories = list(
        map(lambda category: {
            "name": category,
            "fprScore": dataset_file.get_category_score(category),
            "traits": list(
                map(lambda trait: {
                    "name": trait,
                    "count": dataset_file.get_category_trait_counts(category)[trait],
                    "fprMean": dataset_file.get_category_trait_fprs(category)[trait]
                }, dataset_file.get_category_traits(category))
            )
        }, dataset_file.categories)
    )

    dataset = {
        "id": str(uuid.uuid4()),
        "name": file.filename,
        "categories": categories,
        "score": dataset_file.get_overall_score(),
        "description": analyzer.get_overall_analysis()
    }
    past_datasets[dataset["id"]] = dataset
    return dataset
