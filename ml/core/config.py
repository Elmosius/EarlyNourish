from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "API Deteksi Stunting Anak"
    DEBUG_MODE: bool = False

    # Pengaturan PORT
    PORT: int = 8000  

    # Path model 
    MODEL_PATH: str = "models/placeholder_model.h5" 

# Menggunakan lru_cache untuk memastikan instance Settings hanya dibuat sekali (singleton pattern)
@lru_cache
def get_settings() -> Settings:
    return Settings()

# Membuat instance settings yang bisa diimpor langsung
settings = get_settings()
