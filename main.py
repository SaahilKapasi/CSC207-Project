from fastapi import FastAPI, UploadFile
from file_handler import File
import uuid

app = FastAPI()

past_datasets = {}


@app.get("/api/getDataset")
async def get_dataset(id: str):
    print(id, past_datasets)
    if id not in past_datasets:
        return None
    else:
        return past_datasets[id]


@app.post("/api/generateDataset")
async def generate_dataset(file: UploadFile):
    file_stats = File(file.file)
    categories = list(
        map(lambda category: {
            "name": category,
            "fprVarianceScore": file_stats.get_category_var_score(category),
            "fprMeanScore": file_stats.get_category_mean_score(category),
            "traits": list(
                map(lambda trait: {
                    "name": trait,
                    "count": file_stats.get_category_trait_counts(category)[trait],
                    "fprMean":  file_stats.get_category_trait_fprs(category)[trait]
                }, file_stats.get_category_traits(category))
            )
        }, file_stats.categories)
    )

    dataset = {
        "id": str(uuid.uuid4()),
        "name": file.filename,
        "categories": categories,
        "score": file_stats.get_overall_score(method="variance")
    }
    past_datasets[dataset["id"]] = dataset

    return dataset
