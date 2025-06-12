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
