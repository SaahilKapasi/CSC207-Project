import uuid

from fastapi import UploadFile

from backend.entites.dataset_files.csv_file import CSVFile
from backend.use_cases.bias_calculators.variance_calculator import VarianceCalculator

past_datasets = {}


async def get_dataset(id: str):
    if id not in past_datasets:
        return None
    else:
        return past_datasets[id]


async def generate_dataset(file: UploadFile):
    calculator = VarianceCalculator()
    file_stats = CSVFile(file.file, calculator)
    categories = list(
        map(lambda category: {
            "name": category,
            "fprScore": file_stats.get_category_score(category),
            "traits": list(
                map(lambda trait: {
                    "name": trait,
                    "count": file_stats.get_category_trait_counts(category)[trait],
                    "fprMean": file_stats.get_category_trait_fprs(category)[trait]
                }, file_stats.get_category_traits(category))
            )
        }, file_stats.categories)
    )

    dataset = {
        "id": str(uuid.uuid4()),
        "name": file.filename,
        "categories": categories,
        "score": file_stats.get_overall_score()
    }
    past_datasets[dataset["id"]] = dataset
    return dataset
