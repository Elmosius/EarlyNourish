from pydantic import BaseModel, Field
from typing import List, Optional

class StuntingInput(BaseModel):
    age_months: int = Field(..., example=12, description="Usia anak dalam bulan", gt=0)
    weight_kg: float = Field(..., example=8.5, description="Berat badan anak dalam kilogram", gt=0)
    height_cm: float = Field(..., example=70.0, description="Tinggi badan anak dalam sentimeter", gt=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "age_months": 24,
                "weight_kg": 10.2,
                "height_cm": 80.5,
            }
        }
        
class StuntingOutput(BaseModel):
    risk_category: str = Field(..., example="Normal", description="Kategori risiko stunting")
    recommendations: List[str] = Field(..., example=["Lanjutkan ASI eksklusif", "Pantau pertumbuhan rutin"], description="Saran atau rekomendasi") 
    
    class Config:
        json_schema_extra = {
            "example": {
                "risk_category": "Beresiko Stunting",
                "recommendations": [
                    "Segera konsultasikan dengan dokter anak atau ahli gizi.",
                    "Perbaiki asupan nutrisi sesuai anjuran.",
                    "Pastikan mendapat imunisasi lengkap."
                ]
            }
        }