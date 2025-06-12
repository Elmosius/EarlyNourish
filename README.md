# ML Early Nourish 🌾

Ini adalah layanan Machine Learning untuk proyek Early Nourish. Layanan ini menyediakan prediksi terkait gizi anak dan stunting berdasarkan data masukan. API dibangun menggunakan FastAPI.

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

Skema OpenAPI tersedia di:
[http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)
