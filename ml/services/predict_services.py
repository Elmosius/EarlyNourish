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
    
    fitur_input_df = pd.DataFrame([[
        jk_encoded,
        data.bbLahir,
        data.tbLahir,
        data.umur,  
        data.bb,  
        data.tb   
    ]], columns=nama_kolom)

    # 2. Scale features
    fitur_scaled = scaler.transform(fitur_input_df)

    # 3. Make prediction
    pred = model.predict(fitur_scaled)
    pred_label = np.argmax(pred, axis=1)

    # 4. Decode prediction
    status_prediksi = status_encoder.inverse_transform(pred_label)
    
    print(f"Prediksi status stunting: {status_prediksi[0]}")

    tindakan_list = [
        "Lanjutkan pemantauan tumbuh kembang anak secara rutin.",
        "Pastikan asupan gizi seimbang dan adekuat sesuai usia.",
        "Berikan stimulasi yang sesuai untuk perkembangan optimal."
    ]
    if "Stunting" in status_prediksi[0] or "Gizi Kurang" in status_prediksi[0]:
         tindakan_list = [
            "Segera konsultasikan dengan dokter anak atau ahli gizi.",
            "Perlu evaluasi lebih lanjut mengenai status gizi dan tinggi badan.",
            "Tingkatkan asupan protein hewani dan mikronutrien penting (zat besi, zinc, kalsium)."
        ]

    # Nutrition advice
    nutrisi_list = [
        "Pastikan asupan Energi (kalori) cukup sesuai kebutuhan usia anak.",
        "Berikan Protein terutama sumber hewani (telur, ikan, daging, ayam, susu dan produk olahannya) setiap hari.",
        "Lengkapi dengan sumber Lemak sehat (contoh: alpukat, ikan salmon/kembung).",
        "Pastikan asupan Vitamin dan Mineral penting (Zat Besi, Kalsium, Vitamin A, Vitamin D, Zinc) dari beragam sayur, buah, dan sumber lainnya."
    ]
    if "Stunting" in status_prediksi[0] or "Gizi Kurang" in status_prediksi[0]:
        nutrisi_list.extend([
            "Konsultasikan lebih lanjut dengan dokter atau ahli gizi untuk kemungkinan adanya defisiensi mikronutrien spesifik dan kebutuhan suplementasi.",
            "Fokus pada pemberian Makanan Pendamping ASI (MPASI) yang kaya gizi jika anak masih dalam periode MPASI, atau makanan keluarga yang padat gizi."
        ])
    
    return StuntingOutput(
        risikoStunting=status_prediksi[0],
        tindakan=tindakan_list,
        nutrisi=nutrisi_list
    )
