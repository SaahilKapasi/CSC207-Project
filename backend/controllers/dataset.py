from fastapi import APIRouter, UploadFile
from backend.presenters.dataset import generate_dataset, get_dataset, save_comparison, get_comparison
from pydantic import BaseModel

"""
This module defines a FastAPI router for handling dataset and comparison operations.

The router includes endpoints for retrieving datasets and comparisons, generating datasets from uploaded files,
and saving comparison data.
"""

router = APIRouter()


class Comparison(BaseModel):
    data: str


@router.get("/api/getDataset")
async def get_dataset_endpoint(id: str):
    return await get_dataset(id)


@router.get("/api/getComparison")
async def get_comparison_endpoint(id: str):
    return await get_comparison(id)


@router.post("/api/generateDataset")
async def generate_dataset_endpoint(file: UploadFile):
    return await generate_dataset(file)


@router.post("/api/saveComparison")
async def generate_dataset_endpoint(data: Comparison):
    return await save_comparison(data.data)
