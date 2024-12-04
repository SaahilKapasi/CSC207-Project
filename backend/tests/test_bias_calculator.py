import pytest

from backend.entities.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_calculators.bias_calculator import BiasCalculator


@pytest.fixture
def test_dataset():
    return CSVFile("backend/tests/test_data.csv")


@pytest.fixture
def test_calculator():
    return BiasCalculator()


def test_calculate_fpr(test_dataset, test_calculator):
    assert test_calculator.calculate_fpr(test_dataset.df) == 0.4


def test_obtain_fpr_set(test_dataset, test_calculator):
    assert test_calculator.obtain_fpr_set(test_dataset.df, "sex") == [0.4, 0.4]


def test_obtain_fpr_map(test_dataset, test_calculator):
    assert test_calculator.obtain_fpr_map(test_dataset.df, "sex") == {"Female": 0.4, "Male": 0.4}


def test_update_number_kinds_by_irq(test_dataset, test_calculator):
    assert (test_calculator.update_number_kinds_by_irq(test_dataset.df, "age")["age"].tolist()
            == ['0-16', '39+', '0-16', '17-25', '17-25', '26-38', '39+', '39+', '0-16', '39+'])

