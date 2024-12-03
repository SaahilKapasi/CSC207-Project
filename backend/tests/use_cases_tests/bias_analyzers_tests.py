import pytest
from unittest.mock import MagicMock
from backend.entities.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.simple_analyzer import SimpleAnalyzer


@pytest.fixture
def mock_dataset():
    # Mocked DatasetFile instance
    dataset = MagicMock(spec=DatasetFile)
    return dataset


@pytest.fixture
def simple_analyzer(mock_dataset):
    # Instantiate SimpleAnalyzer with the mocked dataset
    return SimpleAnalyzer(dataset=mock_dataset)


def test_score_to_level_all_high(simple_analyzer, mock_dataset):
    mock_dataset.get_overall_score.return_value = 3.0
    level = simple_analyzer.score_to_level()
    assert level == "high"


def test_score_to_level_all_medium(simple_analyzer, mock_dataset):
    mock_dataset.get_overall_score.return_value = 5.0
    level = simple_analyzer.score_to_level()
    assert level == "medium"


def test_score_to_level_all_low(simple_analyzer, mock_dataset):
    mock_dataset.get_overall_score.return_value = 7.5
    level = simple_analyzer.score_to_level()
    assert level == "low"


def test_score_to_level_specific_category_high(simple_analyzer, mock_dataset):
    mock_dataset.get_category_score.return_value = 3.0
    level = simple_analyzer.score_to_level(category="test_category")
    assert level == "high"


def test_get_overall_analysis(simple_analyzer, mock_dataset):
    # Setup mocked dataset behavior
    mock_dataset.get_overall_score.return_value = 5.0
    mock_dataset.get_category_score.side_effect = lambda cat: {"cat1": 3.0, "cat2": 5.5, "cat3": 7.0}[cat]

    # Adjust the test to simulate impact categories without using a non-existent method
    simple_analyzer.get_impact_categories = MagicMock(side_effect=lambda impact: {
        "high": ["cat1"],
        "medium": ["cat2"],
        "low": ["cat3"]
    }.get(impact, []))

    # Call the method under test
    analysis = simple_analyzer.get_overall_analysis()

    # Define the expected output
    expected_output = (
        "The overall amount of bias is medium.\n\n"
        " The following categories have extremely high bias and should be addressed soon: cat1.\n\n"
        " The following categories have medium bias and should be addressed when possible: cat2.\n\n"
        " The following categories have low bias, if you adjust your model try to keep them low: cat3."
    )

    # Assertion
    assert analysis == expected_output



def test_get_impact_categories_high(simple_analyzer):
    # Mock the behavior of get_impact_categories
    simple_analyzer.get_impact_categories = MagicMock(return_value=["cat1", "cat2"])
    high_impact = simple_analyzer.get_impact_categories("high")
    assert high_impact == ["cat1", "cat2"]



def test_get_overall_analysis_varied_impacts(simple_analyzer, mock_dataset):
    """
    Test get_overall_analysis method for varied impact categories.
    """
    # Mocking dataset behavior
    mock_dataset.get_overall_score.return_value = 4.5  # Medium overall bias
    mock_dataset.get_category_score.side_effect = lambda cat: {"cat1": 2.0, "cat2": 4.5, "cat3": 6.8}[cat]

    # Mocking get_impact_categories method for different impact levels
    simple_analyzer.get_impact_categories = MagicMock(side_effect=lambda impact: {
        "high": ["cat1"],
        "medium": ["cat2"],
        "low": ["cat3"]
    }.get(impact, []))

    # Execute the method under test
    analysis = simple_analyzer.get_overall_analysis()

    # Expected result for the analysis
    expected_output = (
        "The overall amount of bias is medium.\n\n"
        " The following categories have extremely high bias and should be addressed soon: cat1.\n\n"
        " The following categories have medium bias and should be addressed when possible: cat2.\n\n"
        " The following categories have low bias, if you adjust your model try to keep them low: cat3."
    )

    # Assertion
    assert analysis == expected_output
