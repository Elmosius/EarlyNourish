import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from schemas.predict_schemas import StuntingInput, StuntingOutput
from core.config import settings

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

async def get_stunting_prediction(data: StuntingInput) -> StuntingOutput:
    if not all([model, scaler, status_encoder]):
        return StuntingOutput(
            risikoStunting="Error: Model tidak dimuat", 
            tindakan=["Silakan periksa log server untuk masalah pemuatan model."],
            nutrisi=["Tidak ada saran nutrisi karena model tidak dapat diakses."]
        )

    print(f"Menerima data untuk prediksi: {data.model_dump()}")

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
    
    # 5. Get age-specific and status-specific recommendations
    tindakan_list, nutrisi_list = get_recommendations_by_age_and_status(data.umur, predicted_status)
    
    return StuntingOutput(
        risikoStunting=predicted_status,
        tindakan=tindakan_list,
        nutrisi=nutrisi_list
    )
