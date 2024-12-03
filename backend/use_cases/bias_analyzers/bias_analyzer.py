from backend.entities.dataset_files.dataset_file import DatasetFile


class BiasAnalyzer:
    dataset: DatasetFile

    def __init__(self, dataset: DatasetFile):
        self.dataset = dataset

        if not self.dataset.is_processed:
            print("An error has occurred, the analyzer was given an unprocessed dataset.")

    def get_overall_analysis(self) -> str:
        raise NotImplementedError

    def score_to_level(self, category="all") -> str:
        raise NotImplementedError

    def get_impact_categories(self, level) -> list[str]:
        return [category for category in self.dataset.categories if self.score_to_level(category) == level]
