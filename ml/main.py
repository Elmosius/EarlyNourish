from fastapi import FastAPI

app = FastAPI(title="FastAPI Example", description="An example FastAPI application", version="1.0.0")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI Example!"}

