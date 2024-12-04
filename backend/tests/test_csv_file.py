import pytest

from backend.entities.dataset_files.csv_file import CSVFile


@pytest.fixture
def dataset():
    # Load the dataset once for reuse in tests
    return CSVFile("backend/tests/test_data.csv")


def test_load_file_has_citizenship_column(dataset):
    assert "citizenship" in dataset.df.columns


def test_load_file_has_sex_column(dataset):
    assert "sex" in dataset.df.columns


def test_load_file_row_count(dataset):
    assert len(dataset.df) == 10
