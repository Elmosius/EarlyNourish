from schemas.predict_schemas import StuntingInput, StuntingOutput
import random 

# Di sinilah nanti akan memuat model TensorFlow
# Contoh:
# try:
#     model = tensorflow.keras.models.load_model('path/to/your/model.h5')
# except Exception as e:
#     # Handle error pemuatan model, mungkin log atau raise exception khusus
#     print(f"Error loading ML model: {e}")
#     model = None

async def get_stunting_prediction(data: StuntingInput) -> StuntingOutput:
    print(f"Menerima data untuk prediksi: {data.model_dump()}") # model_dump() untuk Pydantic V2

    # --- MULAI LOGIKA MOCK ---
    # Logika ini hanya contoh, ganti dengan pemanggilan model ML nanti.

    risk_category = "Normal"
    recommendations = [
        "Lanjutkan pemantauan tumbuh kembang anak secara rutin.",
        "Pastikan asupan gizi seimbang dan adekuat sesuai usia.",
        "Berikan stimulasi yang sesuai untuk perkembangan optimal."
    ]

    if data.height_cm < 70 and data.age_months > 12:
        risk_category = "Beresiko Stunting (Pendek)"
        recommendations = [
            "Segera konsultasikan dengan dokter anak atau ahli gizi.",
            "Perlu evaluasi lebih lanjut mengenai status gizi dan tinggi badan.",
            "Tingkatkan asupan protein hewani dan mikronutrien penting (zat besi, zinc, kalsium)."
        ]
    elif data.weight_kg < (data.age_months * 0.5) and data.age_months > 6: # Contoh logika sangat sederhana
        risk_category = "Gizi Kurang / Beresiko Stunting"
        recommendations = [
            "Segera konsultasikan dengan dokter anak atau ahli gizi untuk evaluasi status gizi.",
            "Perbaiki kualitas dan kuantitas asupan makanan.",
            "Pastikan mendapat imunisasi lengkap dan penanganan jika ada penyakit infeksi."
        ]

    if random.choice([True, False]) and risk_category == "Normal":
         if data.age_months > 24:
            recommendations.append("Pertimbangkan untuk variasi makanan keluarga.")

    # --- AKHIR LOGIKA MOCK ---
    # Pastikan output sesuai dengan skema StuntingOutput
    return StuntingOutput(
        risk_category=risk_category,
        recommendations=recommendations
    )

