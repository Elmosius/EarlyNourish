from fastapi import FastAPI
from routers import predict 
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="API Deteksi Stunting Anak",
    version="0.1.0",
    description="API untuk memprediksi risiko stunting pada anak dan memberikan rekomendasi."
)

origins = [
    "http://localhost", # Jika FE dan BE sama-sama di localhost tapi beda port
    "http://localhost:3000",  # Contoh jika FE React/Vue/Angular berjalan di port 3000
    "http://localhost:5173",  # Contoh jika FE Vite (seperti Vue/React) berjalan di port 5173
    # Tambahkan origin frontend kamu yang sebenarnya di sini nanti
    # "https://domain-frontend-kamu.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"],    
)

app.include_router(predict.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {
        "message": "Selamat datang di API ML!",
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