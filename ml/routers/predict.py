from fastapi import APIRouter, HTTPException
from schemas.predict_schemas import StuntingInput, StuntingOutput
from services import predict_services

# Membuat instance APIRouter
# Kita bisa memberikan prefix dan tags untuk mengelompokkan endpoint di dokumentasi API
router = APIRouter(
    prefix="/ml", 
    tags=["Stunting Prediction"] 
)

@router.post("/predict", response_model=StuntingOutput)
async def predict_stunting_status(input_data: StuntingInput):
    try:
        prediction_result = await predict_services.get_stunting_prediction(data=input_data)
        return prediction_result
    except Exception as e:
        
        print(f"Error during prediction: {e}") 
        raise HTTPException(
            status_code=500,
            detail=f"Terjadi kesalahan internal saat memproses prediksi: {str(e)}"
        )

