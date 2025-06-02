from fastapi import FastAPI
from routers import predict 
from core.config import settings
import uvicorn

app = FastAPI(
    title="API Deteksi Stunting Anak",
    version="0.1.0",
    description="API untuk memprediksi risiko stunting pada anak dan memberikan rekomendasi."
)

app.include_router(predict.router)

@app.get("/", tags=["Root"])
async def read_root():
    """
    Endpoint root untuk salam sapa dan status API.
    """
    return {
        "message": "Selamat datang di API Deteksi Stunting Anak!",
        "status": "Berjalan dengan baik",
        "docs": "/docs"
    }

if __name__ == "__main__":
    print(f"Menjalankan server di http://127.0.0.1:{settings.PORT}") 
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=settings.PORT,
        reload=True
    )