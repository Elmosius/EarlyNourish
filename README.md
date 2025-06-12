# Early Nourish 🌾

Early Nourish adalah aplikasi yang dirancang untuk membantu orang tua, khususnya yang memiliki balita usia 0-5 tahun, dalam mendeteksi risiko stunting secara dini. Aplikasi ini menggunakan model Machine Learning dengan akurasi prediksi mencapai 89%.

<br>

## Tim Pengembang

### Tim Machine Learning (ML)
- Irma Dwiyanti ([@IrmaDwiyanti](https://github.com/IrmaDwiyanti)) - ML Developer
- Irma Rohmatillah ([@irma3111111](https://github.com/irma3111111)) - ML Developer
- Yandiyan ([@spicynoon](https://github.com/spicynoon)) - ML Developer

### Tim Web (Frontend, Backend, UI/UX)
- Elmosius Suli ([@elmosius](https://github.com/elmosius)) - Full-stack Developer
- Joshua Subianto ([@JGkwen](https://github.com/JGkwen)) - Backend Developer
- Nadhila Azzahra ([@nadhilazz](https://github.com/nadhilazz)) - UI/UX Designer

<br>

## Fitur Utama

Berikut adalah fitur-fitur utama yang tersedia di aplikasi Early Nourish:

- **Manajemen Profil:** Pengguna dapat membuat akun dan mengubah informasi profil mereka.
- **Asesmen Stunting:** Mengisi data asesmen anak untuk mendapatkan prediksi status gizi dan potensi risiko stunting.
- **Dashboard Hasil Prediksi:** Menampilkan hasil prediksi secara informatif dan mudah dipahami.
- **Riwayat Pertumbuhan:** Menyimpan dan menampilkan riwayat asesmen serta kesimpulan pertumbuhan anak dari waktu ke waktu.
- **Autentikasi:** Sistem login dan register yang aman untuk pengguna.

<br>

> **⚠️ Status Aplikasi: Versi Beta (alias belum sepenuhnya berfungsi hehe)**
>
> Harap diperhatikan bahwa aplikasi Early Nourish saat ini masih dalam tahap **Beta**. Ini berarti beberapa fitur mungkin belum berfungsi sepenuhnya atau belum diimplementasikan, seperti:
> - Fitur Kontak/Dukungan (Contact).
> - Fitur Unduh PDF untuk hasil asesmen.
> - Dan beberapa fungsionalitas lainnya mungkin masih dalam pengembangan.
>
> Selain itu, ada kemungkinan Anda masih akan menemukan beberapa bug atau kesalahan yang tidak terduga selama penggunaan. Kami sangat menghargai kesabaran dan masukan Anda untuk membantu kami meningkatkan aplikasi ini.
> 

<br>

## Teknologi Utama yang Digunakan

Proyek Early Nourish dibangun menggunakan berbagai teknologi modern untuk setiap komponennya:

- **Layanan Backend:**
  - **Framework:** HapiJS (@hapi/hapi)
  - **Database:** MongoDB (dengan Mongoose ODM)
  - **Bahasa Pemrograman:** JavaScript (Node.js)
  - **Fitur Lain:** JWT, RabbitMQ

- **Aplikasi Frontend:**
  - **Framework:** Vue.js (versi 3)
  - **Build Tool:** Vite
  - **State Management:** Pinia
  - **Styling:** Tailwind CSS
  - **Bahasa Pemrograman:** JavaScript

- **Layanan Machine Learning (ML):**
  - **Framework API:** FastAPI
  - **Bahasa Pemrograman:** Python
  - **ML Libraries:** TensorFlow, Scikit-learn, Pandas, NumPy ,dll

<br>

## URL Akses Publik

Berikut adalah URL untuk mengakses berbagai komponen aplikasi Early Nourish yang telah di-deploy secara publik:

- **Aplikasi Frontend:**
  - URL: [https://early-nourish.vercel.app](https://early-nourish.vercel.app)
  - *Catatan: Backend API masih menggunakan HTTP. Jika ada masalah tampilan/fungsionalitas, nonaktifkan sementara fitur 'secure browser' yang memblokir konten campuran.*

- **Layanan Backend (API):**
  - URL: [api-be-earlynourish.my.id](https://api-be-earlynourish.my.id/)
  - Spesifikasi API Lengkap: [Lihat Dokumen Google Docs](https://docs.google.com/document/d/e/2PACX-1vT-Xnj15juPZrIf6XIM5KhnbTWI0JfqC1B8D7FWT38mNl9kzC6qESgTvN0AHyp_m7HQJlsJaLMJoK-J/pub)

- **Layanan Machine Learning (Dokumentasi API):**
  - URL: [api-ml-earlynourish.my.id/docs](https://api-ml-earlynourish.my.id/)

<br>

## Arsitektur Proyek

Proyek ini terdiri dari beberapa komponen utama:

- **Frontend:** Antarmuka pengguna yang dibangun menggunakan Vue.js.
- **Backend:** Server API yang menangani logika bisnis, manajemen data, dan autentikasi, dibangun dengan Node.js.
- **Machine Learning (ML):** Layanan yang menyediakan model prediksi stunting, dibangun dengan Python dan FastAPI.

<br>

## Detail Teknis dan Instalasi

Untuk detail teknis, prasyarat, dan petunjuk instalasi masing-masing komponen, silakan merujuk ke README di sub-direktori berikut:

- [**Backend (`back-end/`)**](./back-end/README.md) atau bisa melihat [branch back-end](https://github.com/Elmosius/EarlyNourish/tree/back-end)
- [**Frontend (`front-end/`)**](./front-end/README.md) atau bisa melihat [branch front-end](https://github.com/Elmosius/EarlyNourish/tree/front-end)
- [**Machine Learning (`ml/`)**](./ml/README.md) atau bisa melihat branch [ml](https://github.com/Elmosius/EarlyNourish/tree/ml)

<br>

---
*Proyek ini merupakan bagian dari Capstone Project Coding Camp 2025.*
