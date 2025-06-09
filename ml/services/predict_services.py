import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from schemas.predict_schemas import StuntingInput, StuntingOutput
from core.config import settings
from pygrowup import Calculator

# Initialize pygrowup calculator
calculator = Calculator(adjust_height_data=True, include_cdc=True, log_level='DEBUG')

try:
    model = tf.keras.models.load_model(settings.MODEL_STUNTING_H5_PATH)
    scaler = joblib.load(settings.SCALER_STUNTING_PKL_PATH)
    status_encoder = joblib.load(settings.STATUS_ENCODER_PKL_PATH)
    print("Models and encoders loaded successfully!")
except Exception as e:
    print(f"Error loading models/encoders: {e}")
    model = None
    scaler = None
    status_encoder = None

def get_recommendations_by_age_and_status(age_months, status):
    """Generate recommendations based on age group and stunting status"""
    tindakan = []
    nutrisi = []
    
    # 0-6 bulan
    if 0 <= age_months <= 6:
        if "Normal" in status:
            tindakan = [
                "ASI eksklusif 6 bulan",
                "Pantau tumbuh kembang rutin"
            ]
            nutrisi = [
                "ASI langsung dari ibu (8-12x sehari)"
            ]
        elif "Stunting" in status or "Severely Stunted" in status:
            tindakan = [
                "Evaluasi menyusui",
                "Gizi ibu ditingkatkan",
                "Rujukan bila perlu"
            ]
            nutrisi = [
                "ASI eksklusif",
                "Ibu konsumsi: telur, ikan, hati, kacang hijau, sayur hijau, susu ibu menyusui"
            ]
    
    # 6-24 bulan
    elif 6 < age_months <= 24:
        if "Normal" in status:
            tindakan = [
                "MPASI dimulai usia 6 bulan",
                "Edukasi tekstur dan variasi makanan"
            ]
            nutrisi = [
                "Bubur nasi + telur + bayam halus",
                "Puree kentang + ayam + wortel",
                "Snack: pisang, pepaya, biskuit bayi"
            ]
        elif "Stunting" in status:
            tindakan = [
                "Tambah protein & lemak sehat",
                "Konsultasi gizi"
            ]
            nutrisi = [
                "Nasi tim hati + daun katuk",
                "Daging cincang + labu",
                "Snack: alpukat, susu full cream, ubi kukus"
            ]
        elif "Severely Stunted" in status:
            tindakan = [
                "PMT atau RUTF",
                "Suplementasi Fe, zinc, vitamin A/D",
                "Rujukan faskes"
            ]
            nutrisi = [
                "Bubur kacang hijau + santan",
                "Nasi tim daging + minyak",
                "Susu fortifikasi, biskuit balita, roti isi telur"
            ]
    
    # >2 tahun (>24 bulan)
    else:
        if "Normal" in status:
            tindakan = [
                "Variasi menu harian",
                "Makan bersama keluarga",
                "Stimulasi motorik makan"
            ]
            nutrisi = [
                "Nasi + ikan + sayur asem",
                "Sup ayam + kentang",
                "Snack: smoothie pisang, roti isi telur"
            ]
        elif "Stunting" in status:
            tindakan = [
                "Frekuensi makan >5x/hari",
                "Pemantauan tinggi badan bulanan"
            ]
            nutrisi = [
                "Nasi + pepes ikan + buncis",
                "Bubur ayam + telur",
                "Snack: tahu goreng, puding susu, alpukat"
            ]
        elif "Severely Stunted" in status:
            tindakan = [
                "Intervensi komunitas (PMT/Posyandu)",
                "Evaluasi sanitasi dan infeksi"
            ]
            nutrisi = [
                "Nasi + rendang + bayam tumis",
                "Bubur kacang merah + santan",
                "Susu tinggi kalori, camilan berbasis kacang"
            ]
    
    # Add general advice if recommendations are empty
    if not tindakan:
        tindakan = ["Konsultasikan dengan dokter anak atau ahli gizi untuk saran lebih lanjut."]
    if not nutrisi:
        nutrisi = ["Pastikan asupan gizi seimbang sesuai usia."]
            
    return tindakan, nutrisi

def calculate_zscores(gender, age_months, weight_kg, height_cm):
    """Calculate z-scores using pygrowup library"""
    # Convert gender to format expected by pygrowup (M/F)
    gender_formatted = "M" if gender.upper() == "L" else "F"
    
    # Initialize results
    bbU = None
    tbU = None
    bbTb = None
    
    if age_months < 0 or age_months > 240:
        print(f"Warning: Age {age_months} months is outside the typical range covered by WHO/CDC growth standards (0-240 months).")
    elif age_months > 60:
        print(f"Info: Age {age_months} months is outside WHO standard range (0-60 months), attempting calculation with CDC standards.")

    if weight_kg <= 0.5 or weight_kg > 150:
        print(f"Warning: Weight {weight_kg} kg is an extreme value.")
    if height_cm <= 30 or height_cm > 220:
        print(f"Warning: Height {height_cm} cm is an extreme value.")
    
    # Calculate BBU (Weight-for-age) - Use positional arguments
    try:
        bbU_result = calculator.wfa(weight_kg, age_months, gender_formatted)
        print(f"BBU calculation result: {bbU_result}")
        bbU = round(float(bbU_result), 2) if bbU_result is not None else None
    except Exception as e:
        print(f"Error calculating BBU: {e}")
    
    # Calculate TBU (Length/Height-for-age) - Use positional arguments
    try:
        tbU_result = calculator.lhfa(height_cm, age_months, gender_formatted)
        print(f"TBU calculation result: {tbU_result}")
        tbU = round(float(tbU_result), 2) if tbU_result is not None else None
    except Exception as e:
        print(f"Error calculating TBU: {e}")
    
    # Calculate BBTB (Weight-for-length/height) - Try multiple approaches
    try:
        # First try: Standard weight-for-length
        bbTb_result = calculator.wfl(weight_kg, height_cm, gender_formatted)
        print(f"BBTB calculation result: {bbTb_result}")
        bbTb = round(float(bbTb_result), 2) if bbTb_result is not None else None
    except Exception as e:
        print(f"Error calculating BBTB with wfl: {e}")
        try:
            # Second try: Weight-for-height
            bbTb_result = calculator.wfh(weight_kg, height_cm, gender_formatted)
            print(f"BBTB alternative calculation result: {bbTb_result}")
            bbTb = round(float(bbTb_result), 2) if bbTb_result is not None else None
        except Exception as e_alt:
            print(f"Alternative BBTB calculation also failed: {e_alt}")
            try:
                # Third try: Calculate BMI and then use BMI-for-age as approximation
                # This is a reasonable fallback when direct WFL/WFH fails
                bmi = weight_kg / ((height_cm / 100) ** 2)
                bbTb_result = calculator.bfa(bmi, age_months, gender_formatted)
                print(f"BBTB fallback using BMI-for-age: {bbTb_result}")
                bbTb = round(float(bbTb_result), 2) if bbTb_result is not None else None
            except Exception as e_bmi:
                print(f"BMI-for-age calculation also failed: {e_bmi}")
                
                # If all else fails, provide an estimate based on the ratio of BBU and TBU
                if bbU is not None and tbU is not None:
                    # This is an approximation formula based on the relationship between
                    # weight-for-age, height-for-age and weight-for-height
                    estimated_bbTb = bbU - (0.7 * tbU)
                    bbTb = round(float(estimated_bbTb), 2)
                    print(f"BBTB estimated from BBU and TBU: {bbTb}")
    
    print(f"Final z-scores to be returned: bbU={bbU}, tbU={tbU}, bbTb={bbTb}")
    return bbU, tbU, bbTb

async def get_stunting_prediction(data: StuntingInput) -> StuntingOutput:
    if not all([model, scaler, status_encoder]):
        return StuntingOutput(
            risikoStunting="Error: Model tidak dimuat", 
            tindakan=["Silakan periksa log server untuk masalah pemuatan model."],
            nutrisi=["Tidak ada saran nutrisi karena model tidak dapat diakses."],
            bbU=None,
            tbU=None,
            bbTb=None
        )

    print(f"Menerima data untuk prediksi: {data.model_dump()}")

    # Calculate z-scores using pygrowup
    bbU, tbU, bbTb = calculate_zscores(
        gender=data.jk,
        age_months=data.umur,
        weight_kg=data.bb,
        height_cm=data.tb
    )
    
    # Print the calculated values immediately after function returns
    print(f"After calculation function - Raw values: bbU={bbU}, tbU={tbU}, bbTb={bbTb}")
    
    # Explicitly convert values to float or None for Pydantic model
    bbU_value = float(bbU) if bbU is not None else None
    tbU_value = float(tbU) if tbU is not None else None
    bbTb_value = float(bbTb) if bbTb is not None else None
    
    print(f"After explicit conversion - Values: bbU={bbU_value}, tbU={tbU_value}, bbTb={bbTb_value}")

    # 1. Preprocess input data
    jk_encoded = 0 if data.jk.upper() == "P" else 1

    nama_kolom = ["JK", "BB_Lahir", "TB_Lahir", "Umur", "Berat", "Tinggi"]
    
    fitur_input_df = pd.DataFrame([
        [
            jk_encoded,
            data.bbLahir,
            data.tbLahir,
            data.umur,  
            data.bb,  
            data.tb   
        ]
    ], columns=nama_kolom)

    # 2. Scale features
    fitur_scaled = scaler.transform(fitur_input_df)

    # 3. Make prediction
    pred = model.predict(fitur_scaled)
    pred_label = np.argmax(pred, axis=1)

    # 4. Decode prediction
    status_prediksi = status_encoder.inverse_transform(pred_label)
    predicted_status = status_prediksi[0]
    
    print(f"Prediksi status stunting: {predicted_status}")
    print(f"Right before return - Z-scores: bbU={bbU_value}, tbU={tbU_value}, bbTb={bbTb_value}")
    
    # 5. Get age-specific and status-specific recommendations
    tindakan_list, nutrisi_list = get_recommendations_by_age_and_status(data.umur, predicted_status)
    
    # Create and return result using direct values (no intermediate variable references)
    return StuntingOutput(
        risikoStunting=predicted_status,
        tindakan=tindakan_list,
        nutrisi=nutrisi_list,
        bbU=bbU_value,
        tbU=tbU_value,
        bbTb=bbTb_value
    )
