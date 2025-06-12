# Backend Early Nourish🌾

Ini adalah layanan backend untuk proyek Early Nourish, menyediakan API untuk autentikasi pengguna, manajemen data, dan komunikasi dengan layanan ML.

## Akses Publik Layanan Backend
Layanan backend dapat diakses secara publik melalui URL berikut:
[http://3.0.101.147](http://3.0.101.147)

Untuk detail lengkap mengenai endpoint API, struktur request dan response, serta informasi lainnya, silakan merujuk ke dokumen spesifikasi API kami:
[Spesifikasi API Detail (Google Docs)](https://docs.google.com/document/d/1stmp3PBsQIGKKsLM0CH3UeTV3bW7SsOwRVBQLXcyO0Y/edit?tab=t.0)

## Prasyarat
- Node.js (versi X.X.X atau lebih tinggi direkomendasikan)
- npm (versi X.X.X atau lebih tinggi direkomendasikan)
- MongoDB (pastikan Anda memiliki instance yang berjalan atau string koneksi)

## Variabel Lingkungan
Buat file `.env` di direktori root `back-end` dan tambahkan variabel berikut:

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000
JWT_SECRET=<your_jwt_secret_key>
RABBITMQ_URL=amqp://guest:guest@localhost:5672
ACCESS_TOKEN_KEY=<your_access_token_secret_key>
REFRESH_TOKEN_KEY=<your_refresh_token_secret_key>
ML_API_URL=<your_ml_service_api_url>
```
**Catatan:** Ganti placeholder seperti `<your_mongodb_connection_string>` dengan nilai aktual Anda.

## Instalasi
1. Clone repositori:
   ```bash
   git clone <your_repository_url>
   ```
2. Navigasi ke direktori backend:
   ```bash
   cd EarlyNourish/back-end 
   ```
   (Asumsikan 'EarlyNourish' adalah folder root proyek, sesuaikan jika perlu berdasarkan path clone aktual)
3. Instal dependensi:
   ```bash
   npm install
   ```

## Menjalankan Server
1. Pastikan instance MongoDB Anda berjalan dan dapat diakses.
2. Pastikan instance RabbitMQ Anda berjalan dan dapat diakses.
3. Mulai server:
   ```bash
   npm start
   ```
Server biasanya akan berjalan pada port yang ditentukan dalam file `.env` Anda (default adalah 3000).
