from fastapi import APIRouter, UploadFile
from backend.presenters.dataset import generate_dataset, get_dataset

router = APIRouter()


@router.get("/api/getDataset")
async def get_dataset_endpoint(id: str):
    return await get_dataset(id)


@router.post("/api/generateDataset")
async def generate_dataset_endpoint(file: UploadFile):
    return await generate_dataset(file)
