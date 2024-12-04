import pytest

from backend.presenters.presenters import save_comparison, get_comparison, past_comparisons, past_datasets, get_dataset


@pytest.mark.asyncio
async def test_save_comparison():
    data = "123"
    returned_id = await save_comparison(data)
    assert past_comparisons[returned_id] == data


@pytest.mark.asyncio
async def test_get_comparison():
    past_comparisons["123"] = "456"
    assert await get_comparison("123") == "456"


@pytest.mark.asyncio
async def test_get_dataset():
    past_datasets["123"] = "456"
    assert await get_dataset("123") == "456"
