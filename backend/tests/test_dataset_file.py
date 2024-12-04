import pytest

from backend.entities.dataset_files.csv_file import CSVFile


@pytest.fixture
def test_dataset():
    return CSVFile("backend/tests/test_data.csv")


def test_get_present_categories(test_dataset):
    # PROTECTED_CLASSES are used to identify categories
    expected_categories = {"citizenship", "sex", "age"}
    assert test_dataset.get_present_categories() == expected_categories


def test_get_category_traits(test_dataset):
    # Check unique traits in the "citizenship" category
    expected_traits = {"US", "Vietnam", "Canada", "South Korea", "Mexico", "Korea", "China"}
    assert test_dataset.get_category_traits("citizenship") == expected_traits


def test_get_category_trait_counts(test_dataset):
    # Check the counts of each trait in the "citizenship" category
    assert test_dataset.get_category_trait_counts("sex") == {"Female": 5, "Male": 5}


def test_get_category_trait_fprs(test_dataset):
    # Note: Manually setting the category_fprs here since they are calculated in the BiasCalculator use case
    # and the calculation will be tested there
    test_dataset.category_fprs = {
        "citizenship": {"US": 0.1, "Canada": 0.2, "Mexico": 0.3},
        "sex": {"Male": 0.15, "Female": 0.25}
    }

    assert test_dataset.get_category_trait_fprs("sex") == {"Male": 0.15, "Female": 0.25}
