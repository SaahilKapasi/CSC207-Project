import uuid

from fastapi import UploadFile

from backend.entites.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_analyzers.simple_analyzer import SimpleAnalyzer
from backend.use_cases.bias_calculators.variance_calculator import VarianceCalculator

past_datasets = {}


async def get_dataset(id: str):
    if id not in past_datasets:
        return None
    else:
        return past_datasets[id]


async def generate_dataset(file: UploadFile):
    calculator = VarianceCalculator()
    dataset_file = CSVFile(file.file, calculator)
    analyzer = SimpleAnalyzer(dataset_file)
    categories = list(
        map(lambda category: {
            "name": category,
            "fprScore": dataset_file.get_category_score(category),
            "traits": list(
                map(lambda trait: {
                    "name": trait,
                    "count": dataset_file.get_category_trait_counts(category)[trait],
                    "fprMean": dataset_file.get_category_trait_fprs(category)[trait]
                }, dataset_file.get_category_traits(category))
            )
        }, dataset_file.categories)
    )

    dataset = {
        "id": str(uuid.uuid4()),
        "name": file.filename,
        "categories": categories,
        "score": dataset_file.get_overall_score(),
        "description": analyzer.get_overall_analysis()
    }
    past_datasets[dataset["id"]] = dataset
    return dataset
