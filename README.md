# Frontend Early Nourish 🌾

Ini adalah aplikasi frontend untuk proyek Early Nourish, menyediakan antarmuka pengguna untuk berinteraksi dengan layanan Early Nourish.

## Teknologi yang Digunakan

Berikut adalah beberapa teknologi utama dan pustaka (library) yang digunakan dalam pengembangan aplikasi frontend ini:

- **Framework Utama:**
  - [Vue.js](https://vuejs.org/): Framework JavaScript progresif untuk membangun antarmuka pengguna.
- **Build Tool & Development Server:**
  - [Vite](https://vitejs.dev/): Alat build frontend generasi berikutnya yang sangat cepat.
- **Routing:**
  - [Vue Router](https://router.vuejs.org/): Library routing resmi untuk Vue.js.
- **State Management:**
  - [Pinia](https://pinia.vuejs.org/): Library state management yang intuitif untuk Vue.js.
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/): Framework CSS utility-first untuk desain kustom yang cepat.
- **HTTP Client:**
  - [Axios](https://axios-http.com/): Klien HTTP berbasis Promise untuk browser dan Node.js.
- **Charting/Grafik:**
  - [ApexCharts](https://apexcharts.com/): Library grafik interaktif modern.
  - [Vue3-ApexCharts](https://github.com/apexcharts/vue3-apexcharts): Komponen Vue.js untuk ApexCharts.
- **Icons:**
  - [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next): Paket ikon SVG yang indah dan konsisten.
- **CSV Parsing:**
  - [Papaparse](https://www.papaparse.com/): Parser CSV in-browser yang cepat dan powerful.
- **Alat Pengembangan (Development Tools):**
  - [Prettier](https://prettier.io/): Formatter kode.

## Akses Publik Aplikasi Frontend
Aplikasi frontend dapat diakses secara publik melalui URL berikut:
[https://early-nourish.vercel.app](https://early-nourish.vercel.app)

**Catatan Penting:**
Saat ini, layanan backend yang digunakan oleh aplikasi ini masih berjalan menggunakan protokol HTTP. Beberapa browser modern memiliki fitur keamanan (seperti mode HTTPS-Only atau pemblokiran konten campuran) yang dapat mencegah frontend memuat data dari backend HTTP jika frontend diakses melalui HTTPS (seperti pada `vercel.app`).

Jika Anda mengalami masalah dalam memuat data atau fungsionalitas tertentu tidak berjalan semestinya (misalnya, gambar tidak muncul):
1. Pastikan tidak ada error terkait _mixed content_ di konsol browser Anda.
2. Anda mungkin perlu menonaktifkan sementara fitur keamanan browser yang memblokir konten campuran atau mengizinkan situs ini secara spesifik. Pengaturan ini berbeda-beda tergantung browser yang Anda gunakan.
3. Beberapa fitur, seperti pemuatan gambar yang di-host di backend, mungkin tidak akan berfungsi dengan benar hingga backend juga menggunakan HTTPS.

## Prasyarat
- Node.js (versi X.X.X atau lebih tinggi direkomendasikan)
- npm (versi X.X.X atau lebih tinggi direkomendasikan)

## Variabel Lingkungan
Buat file `.env` di direktori root `front-end` dan tambahkan variabel berikut:

```
VITE_API_URL=<your_backend_api_url>
```
**Catatan:** Ganti `<your_backend_api_url>` dengan URL aktual dari layanan backend Anda yang sedang berjalan. Ini digunakan oleh Vite untuk proksi permintaan API selama pengembangan dan untuk mengkonfigurasi endpoint API untuk build produksi.

## Instalasi
1. Clone repositori (jika Anda belum melakukannya):
   ```bash
   git clone <your_repository_url>
   ```
2. Navigasi ke direktori frontend:
   ```bash
   cd EarlyNourish/front-end
   ```
   (Asumsikan 'EarlyNourish' adalah folder root proyek, sesuaikan jika perlu)
3. Instal dependensi:
   ```bash
   npm install
   ```

## Menjalankan Development Server
1. Pastikan layanan backend Anda berjalan dan dapat diakses.
2. Mulai development server:
   ```bash
   npm run dev
   ```
Ini biasanya akan memulai frontend pada `http://localhost:5173` (atau port lain jika 5173 sedang digunakan).

## Build untuk Produksi
Untuk membuat build produksi:
```bash
npm run build
```
File yang siap untuk produksi akan berlokasi di direktori `dist`.
