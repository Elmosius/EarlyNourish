import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from schemas.predict_schemas import StuntingInput, StuntingOutput
from core.config import settings
from pygrowup import Calculator

# Initialize pygrowup calculator
calculator = Calculator(adjust_height_data=True, include_cdc=False, log_level='ERROR')

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
    
    # Check if inputs are within valid ranges for WHO standards
    if age_months < 0 or age_months > 60:  # WHO standards are typically for under 5 years
        print(f"Warning: Age {age_months} months may be outside valid range")
    if weight_kg <= 0 or weight_kg > 30:  # Sanity check for weight
        print(f"Warning: Weight {weight_kg} kg may be outside valid range")
    if height_cm <= 0 or height_cm > 120:  # Sanity check for height
        print(f"Warning: Height {height_cm} cm may be outside valid range")
    
    try:
        # Direct method calls with keyword arguments
        bbU = calculator.wfa(weight=weight_kg, age_in_months=age_months, sex=gender_formatted)
        print(f"BBU calculation result: {bbU}")
        
        tbU = calculator.lhfa(length_height=height_cm, age_in_months=age_months, sex=gender_formatted)
        print(f"TBU calculation result: {tbU}")
        
        bbTb = calculator.wfl(weight=weight_kg, length_height=height_cm, sex=gender_formatted)
        print(f"BBTB calculation result: {bbTb}")
        
        # Convert to float and round to 2 decimal places
        bbU = round(float(bbU), 2) if bbU is not None else None
        tbU = round(float(tbU), 2) if tbU is not None else None
        bbTb = round(float(bbTb), 2) if bbTb is not None else None
        
        return bbU, tbU, bbTb
        
    except Exception as e:
        print(f"Error calculating z-scores with standard parameters: {e}")
        
        # Try several parameter variations
        methods = [
            # Method 1: using positional arguments
            lambda: (
                calculator.wfa(weight_kg, age_months, gender_formatted),
                calculator.lhfa(height_cm, age_months, gender_formatted),
                calculator.wfl(weight_kg, height_cm, gender_formatted)
            ),
            # Method 2: different keyword arguments
            lambda: (
                calculator.wfa(weight_kg=weight_kg, age_months=age_months, sex=gender_formatted),
                calculator.lhfa(height_cm=height_cm, age_months=age_months, sex=gender_formatted),
                calculator.wfl(weight_kg=weight_kg, height_cm=height_cm, sex=gender_formatted)
            ),
            # Method 3: different function names (some versions use different names)
            lambda: (
                getattr(calculator, 'wfa', calculator.wfa)(weight=weight_kg, age_in_months=age_months, sex=gender_formatted),
                getattr(calculator, 'hfa', calculator.lhfa)(length_height=height_cm, age_in_months=age_months, sex=gender_formatted),
                getattr(calculator, 'wfh', calculator.wfl)(weight=weight_kg, length_height=height_cm, sex=gender_formatted)
            )
        ]
        
        for i, method in enumerate(methods):
            try:
                print(f"Trying method {i+1}...")
                bbU, tbU, bbTb = method()
                
                bbU = round(float(bbU), 2) if bbU is not None else None
                tbU = round(float(tbU), 2) if tbU is not None else None
                bbTb = round(float(bbTb), 2) if bbTb is not None else None
                
                print(f"Method {i+1} worked: bbU={bbU}, tbU={tbU}, bbTb={bbTb}")
                return bbU, tbU, bbTb
            except Exception as e_method:
                print(f"Method {i+1} failed: {e_method}")
        
        print("All z-score calculation methods failed")
        return None, None, None

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
    print(f"Z-scores: bbU={bbU}, tbU={tbU}, bbTb={bbTb}")
    
    # 5. Get age-specific and status-specific recommendations
    tindakan_list, nutrisi_list = get_recommendations_by_age_and_status(data.umur, predicted_status)
    
    return StuntingOutput(
        risikoStunting=predicted_status,
        tindakan=tindakan_list,
        nutrisi=nutrisi_list,
        bbU=bbU,
        tbU=tbU,
        bbTb=bbTb
    )
