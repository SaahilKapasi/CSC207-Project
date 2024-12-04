import pytest

from backend.entities.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_calculators.accuracy_calculator import AccuracyCalculator


@pytest.fixture
def test_dataset():
    return CSVFile("test_data.csv")


@pytest.fixture
def test_calculator():
    return AccuracyCalculator()


def test_process_dataset(test_dataset, test_calculator):
    test_calculator.process_dataset(test_dataset)
    assert (test_dataset.get_overall_score()
            == test_calculator.calculate_overall_score(test_dataset.df, test_dataset.categories))


def test_calculate_overall_score(test_dataset, test_calculator):
    assert round(test_calculator.calculate_overall_score(test_dataset.df, test_dataset.categories), 3) == 6.107


def test_calculate_score(test_dataset, test_calculator):
    assert round(test_calculator.calculate_score(test_dataset.df, "age"), 3) == 5.417
