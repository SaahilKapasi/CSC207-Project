"""
presenters.py

This module defines API endpoints for interacting with datasets and comparisons.

It provides routes for:
- Retrieving datasets and comparisons by their unique IDs.
- Uploading files to generate datasets with scores and analyses.
- Saving comparisons and generating frontend-compatible links.

The module uses FastAPI's routing system and depends on the backend for dataset processing and storage.
"""

from fastapi import APIRouter, UploadFile
from backend.presenters.presenters import (
    generate_dataset,
    get_dataset,
    save_comparison,
    get_comparison,
)
from pydantic import BaseModel
import os

router = APIRouter()


class Comparison(BaseModel):
    """
    Represents the structure of a comparison object to be received via the API.

    Attributes:
        data (str): The data content of the comparison to be saved.
    """
    data: str


@router.get("/api/getDataset")
async def get_dataset_endpoint(id: str) -> str | dict:
    """
    Retrieves a dataset by its unique ID.

    Args:
        id (str): The unique identifier for the dataset.

    Returns:
        dict | str: The dataset information if found, or "Missing" if the ID is not in storage.
    """
    return await get_dataset(id)


@router.get("/api/getComparison")
async def get_comparison_endpoint(id: str) -> str | dict:
    """
    Retrieves a comparison by its unique ID.

    Args:
        id (str): The unique identifier for the comparison.

    Returns:
        dict | str: The comparison data if found, or "Missing" if the ID is not in storage.
    """
    return await get_comparison(id)


@router.post("/api/generateDataset")
async def generate_dataset_endpoint(file: UploadFile) -> dict:
    """
    Processes an uploaded file to generate a dataset with scores and analyses.

    Args:
        file (UploadFile): The uploaded file containing the dataset.

    Returns:
        dict: A structured dataset representation including its ID, name, categories, scores, and analysis.
    """
    return await generate_dataset(file)


@router.post("/api/generateDatasetLink")
async def generate_dataset_link_endpoint(file: UploadFile) -> str:
    """
    Processes an uploaded file to generate a dataset and returns a frontend-compatible link.

    The link includes the dataset ID appended to the frontend URL.

    Args:
        file (UploadFile): The uploaded file containing the dataset.

    Returns:
        str: A frontend-compatible URL linking to the generated dataset.
    """
    frontend_url = os.getenv("FRONTEND_URL")
    dataset = await generate_dataset(file)
    return f"{frontend_url}/#{dataset['id']}"


@router.post("/api/saveComparison")
async def save_comparison_endpoint(data: Comparison) -> str:
    """
    Saves a comparison object and generates a unique ID for it.

    Args:
        data (Comparison): The comparison object containing the data to save.

    Returns:
        str: The unique identifier for the saved comparison.
    """
    return await save_comparison(data.data)
