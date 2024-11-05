from fastapi import FastAPI

app = FastAPI()


@app.get("/api")
async def root():
    return {"message": "Hello World"}


@app.get("/api/hello/{name}")
async def say_hello(name: str, amount: int = 1):
    result = f"Hello {name} " * amount
    return {"message": result.strip()}

def calculation_1():
    return 5 + 5


def calculation_2():
    return 5 * 5