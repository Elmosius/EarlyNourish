import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "API Deteksi Stunting Anak"
    DEBUG_MODE: bool = False

    PORT: int = 8000  
    
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Path model 
    MODEL_STUNTING_H5_PATH: str = os.path.join(BASE_DIR, "models", "model_stunting_best_tuned.h5")
    SCALER_STUNTING_PKL_PATH: str = os.path.join(BASE_DIR, "models", "scaler_stunting.pkl")
    STATUS_ENCODER_PKL_PATH: str = os.path.join(BASE_DIR, "models", "status_encoder.pkl")

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
