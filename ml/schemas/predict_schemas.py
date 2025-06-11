from pydantic import BaseModel, Field
from typing import List, Optional

class StuntingInput(BaseModel):
    jk: str = Field(..., example="L", description="Jenis Kelamin (L/P)")
    bbLahir: float = Field(..., example=3.0, description="Berat Badan Lahir (kg)", gt=0)
    tbLahir: float = Field(..., example=50.0, description="Tinggi Badan Lahir (cm)", gt=0)
    umur: int = Field(..., example=12, description="Usia anak dalam bulan", gt=0)
    bb: float = Field(..., example=8.5, description="Berat badan anak dalam kilogram", gt=0)
    tb: float = Field(..., example=70.0, description="Tinggi badan anak dalam sentimeter", gt=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "jk": "L",
                "bbLahir": 3.0,
                "tbLahir": 50.0,
                "umur": 24,
                "bb": 10.2,
                "tb": 80.5,
            }
        }
        
class StuntingOutput(BaseModel):
    risikoStunting: str = Field(..., example="Normal", description="Prediksi risiko stunting anak")
    tindakan: List[str] = Field(..., example=["Lanjutkan pemantauan tumbuh kembang.", "Pastikan asupan gizi seimbang."], description="Saran tindakan yang direkomendasikan")
    nutrisi: List[str] = Field(..., example=["Pastikan asupan kalori cukup.", "Perbanyak sumber protein hewani dan nabati."], description="Saran nutrisi spesifik")
    bbU: Optional[float] = Field(default=None, example=-1.2, description="Z-score berat badan menurut umur")
    tbU: Optional[float] = Field(default=None, example=-2.1, description="Z-score tinggi badan menurut umur")
    bbTb: Optional[float] = Field(default=None, example=-0.5, description="Z-score berat badan menurut tinggi badan")
    
    class Config:
        json_schema_extra = {
            "example": {
                "risikoStunting": "Normal",
                "tindakan": [
                    "Lanjutkan pemantauan tumbuh kembang anak secara rutin.",
                    "Pastikan asupan gizi seimbang dan adekuat sesuai usia."
                ],
                "nutrisi": [
                    "Pastikan asupan Energi (kalori) sesuai kebutuhan usia.",
                    "Berikan Protein terutama hewani (telur, ikan, ayam, daging, susu) setiap hari."
                ],
                "bbU": -0.8,
                "tbU": -1.2, 
                "bbTb": -0.3
            }
        }