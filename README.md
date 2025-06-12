# Early Nourish 🌾

Early Nourish adalah aplikasi yang dirancang untuk membantu orang tua, khususnya yang memiliki balita usia 0-5 tahun, dalam mendeteksi risiko stunting secara dini. Aplikasi ini menggunakan model Machine Learning dengan akurasi prediksi mencapai 89%.

<br>

## Fitur Utama

Berikut adalah fitur-fitur utama yang tersedia di aplikasi Early Nourish:

- **Manajemen Profil:** Pengguna dapat membuat akun dan mengubah informasi profil mereka.
- **Asesmen Stunting:** Mengisi data asesmen anak untuk mendapatkan prediksi status gizi dan potensi risiko stunting.
- **Dashboard Hasil Prediksi:** Menampilkan hasil prediksi secara informatif dan mudah dipahami.
- **Riwayat Pertumbuhan:** Menyimpan dan menampilkan riwayat asesmen serta kesimpulan pertumbuhan anak dari waktu ke waktu.
- **Autentikasi:** Sistem login dan register yang aman untuk pengguna.

<br>

## URL Akses Publik

Berikut adalah URL untuk mengakses berbagai komponen aplikasi Early Nourish yang telah di-deploy secara publik:

- **Aplikasi Frontend:**
  - URL: [https://early-nourish.vercel.app](https://early-nourish.vercel.app)
  - *Catatan: Backend API masih menggunakan HTTP. Jika ada masalah tampilan/fungsionalitas, nonaktifkan sementara fitur 'secure browser' yang memblokir konten campuran.*

- **Layanan Backend (API):**
  - URL: [http://3.0.101.147](http://3.0.101.147)
  - Spesifikasi API Lengkap: [Lihat Dokumen Google Docs](https://docs.google.com/document/d/1stmp3PBsQIGKKsLM0CH3UeTV3bW7SsOwRVBQLXcyO0Y/edit?tab=t.0)

- **Layanan Machine Learning (Dokumentasi API):**
  - URL: [http://13.250.122.70/docs](http://13.250.122.70/docs)

<br>

## Arsitektur Proyek

Proyek ini terdiri dari beberapa komponen utama:

- **Frontend:** Antarmuka pengguna yang dibangun menggunakan Vue.js.
- **Backend:** Server API yang menangani logika bisnis, manajemen data, dan autentikasi, dibangun dengan Node.js.
- **Machine Learning (ML):** Layanan yang menyediakan model prediksi stunting, dibangun dengan Python dan FastAPI.

<br>

## Detail Teknis dan Instalasi

Untuk detail teknis, prasyarat, dan petunjuk instalasi masing-masing komponen, silakan merujuk ke README di sub-direktori berikut:

- [**Backend (`back-end/`)**](./back-end/README.md)
- [**Frontend (`front-end/`)**](./front-end/README.md)
- [**Machine Learning (`ml/`)**](./ml/README.md)

---

*Proyek ini merupakan bagian dari Capstone Project Coding Camp 2025.*
