import pytest

from backend.controllers.controllers import save_comparison_endpoint, get_comparison_endpoint, get_dataset_endpoint, \
    Comparison
from backend.presenters.presenters import past_comparisons, past_datasets


@pytest.mark.asyncio
async def test_save_comparison():
    comparison = Comparison(data="123")
    returned_id = await save_comparison_endpoint(comparison)
    assert past_comparisons[returned_id] == "123"


@pytest.mark.asyncio
async def test_get_comparison():
    past_comparisons["123"] = "456"
    assert await get_comparison_endpoint("123") == "456"


@pytest.mark.asyncio
async def test_get_dataset():
    past_datasets["123"] = "456"
    assert await get_dataset_endpoint("123") == "456"
