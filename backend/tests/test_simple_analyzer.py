import pytest

from backend.entities.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_analyzers.simple_analyzer import SimpleAnalyzer


@pytest.fixture
def test_analyzer():
    test_dataset = CSVFile("backend/tests/test_data.csv")
    return SimpleAnalyzer(test_dataset)


def test_overall_analysis(test_analyzer):
    expected = """The overall amount of bias is high.

The following categories have extremely high bias and should be addressed soon:"""
    actual = test_analyzer.get_overall_analysis()
    categories = actual[len(actual) - 24: len(actual) - 3].split(", ")

    # Explanation for the test, the categories appear in a random order at the end of the statement (since
    # we use unordered data structures. Therefore, we strip them out to make sure the message is correct
    # and then make sure those three categories are in fact there at the end
    assert (actual[:len(actual) - 25] == expected and set(categories) == {"age", "citizenship", "sex"})


def test_score_to_level(test_analyzer):
    assert test_analyzer.score_to_level("age") == "high"


def test_get_impact_categories(test_analyzer):
    assert set(test_analyzer.get_impact_categories("high")) == {"age", "citizenship", "sex"}
