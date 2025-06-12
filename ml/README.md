# ML Early Nourish 🌾

Ini adalah layanan Machine Learning untuk proyek Early Nourish. Layanan ini menyediakan prediksi terkait gizi anak dan stunting berdasarkan data masukan. API dibangun menggunakan FastAPI.

# Teknologi yang Digunakan

Berikut adalah beberapa teknologi utama dan pustaka (library) yang digunakan dalam pengembangan layanan Machine Learning ini:

- **Web Framework:**
  - [FastAPI](https://fastapi.tiangolo.com/): Framework web modern dan cepat untuk membangun API dengan Python 3.7+.
- **ASGI Server:**
  - [Uvicorn](https://www.uvicorn.org/): Server ASGI secepat kilat, digunakan untuk menjalankan aplikasi FastAPI.
- **Validasi Data & Pengaturan:**
  - [Pydantic](https://docs.pydantic.dev/): Validasi data dan manajemen pengaturan menggunakan type hints Python.
- **Machine Learning & Komputasi Numerik:**
  - [TensorFlow](https://www.tensorflow.org/): Platform end-to-end open-source untuk machine learning.
  - [Scikit-learn](https://scikit-learn.org/): Library machine learning yang simpel dan efisien untuk analisis data prediktif.
  - [Pandas](https://pandas.pydata.org/): Library untuk analisis dan manipulasi data berperforma tinggi dan mudah digunakan.
  - [NumPy](https://numpy.org/): Paket fundamental untuk komputasi saintifik dengan Python.
- **Model Persistence/Serialization:**
  - [Joblib](https://joblib.readthedocs.io/): Library untuk menjalankan fungsi Python sebagai pekerjaan paralel, dan juga untuk persistensi objek Python (misalnya model).

## Prasyarat
- Python (versi 3.x direkomendasikan, periksa `requirements.txt` untuk kompatibilitas pustaka tertentu)
- pip (pemasang paket Python)

## Pengaturan dan Instalasi
1. Clone repositori (jika Anda belum melakukannya):
   ```bash
   git clone <your_repository_url>
   ```
2. Navigasi ke direktori ML:
   ```bash
   cd EarlyNourish/ml
   ```
   (Asumsikan 'EarlyNourish' adalah folder root proyek, sesuaikan jika perlu)
3. Buat virtual environment (disarankan):
   ```bash
   python -m venv venv
   ```
4. Aktifkan virtual environment:
   - Di Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Di macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
5. Instal dependensi dari `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

## Menjalankan Layanan ML
Layanan ini menggunakan Uvicorn untuk menjalankan aplikasi FastAPI.
1. Pastikan Anda berada di direktori `ml` dan virtual environment Anda diaktifkan.
2. Mulai server Uvicorn:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - `--host 0.0.0.0` membuat server dapat diakses dari jaringan Anda.
   - `--port 8000` menjalankan layanan pada port 8000.
   - `--reload` mengaktifkan pemuatan ulang otomatis saat kode berubah (berguna untuk pengembangan).

## Akses Publik Layanan ML
Dokumentasi API untuk layanan ML dapat diakses secara publik melalui URL berikut:
[http://13.250.122.70/docs](http://13.250.122.70/docs)

Anda dapat menggunakan URL ini untuk melihat endpoint yang tersedia dan berinteraksi dengan API layanan ML.

## Dokumentasi API
Setelah layanan berjalan, dokumentasi API (disediakan oleh Swagger UI FastAPI) dapat diakses di:
[http://localhost:8000/docs](http://localhost:8000/docs)

