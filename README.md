# ICATI — Situs Web

Situs web resmi **ICATI (Ikatan Citra Alumni Taiwan Indonesia, Jawa Timur)** — situs statis berbahasa Indonesia dengan identitas visual tinta-cina (shui-mo), tekstur kertas beras, dan komposisi editorial kontemporer.

Dibangun dengan **HTML, CSS, dan JavaScript murni** — tanpa build step, tanpa framework. Cukup buka `index.html` atau jalankan server statis sederhana.

## Menjalankan

1. Klik dua kali `index.html`, atau
2. Jalankan server lokal:

```bash
cd "/Users/laura/Documents/ICATI PROJECT"
python3 -m http.server 8080
```

lalu buka `http://localhost:8080`.

## Struktur

```
├── index.html          # Beranda
├── tentang.html        # Tentang ICATI
├── pendaftaran.html    # Pendaftaran (Beasiswa & Kuliah)
├── discipleship.html   # Discipleship (jejak alumni)
├── poster.html         # Galeri Poster + Panduan Taiwan (PDF & brosur universitas)
├── POSTERS/            # Poster & brosur universitas yang dibagikan tim ICATI
├── PANDUAN KOMPREHENSIF PERGURUAN TINGGI TAIWAN.pdf
├── css/
│   ├── tokens.css      # Palet warna, tipografi, jarak (desain sistem)
│   ├── base.css        # Reset, tipografi dasar, tombol, utilitas
│   ├── components.css  # Komponen: header, hero, kartu, timeline, galeri, footer
│   └── responsive.css  # Breakpoint tablet & ponsel
├── js/
│   └── main.js         # Menu, pencarian, animasi, galeri & lightbox
├── assets/
│   ├── ink/            # Seni tinta (SVG): gunung, bambu, burung, segel…
│   └── img/            # Logo, favicon & foto
└── README.md
```

## ⚠️ Daftar Placeholder — HARUS DIGANTI

Konten berikut belum tersedia saat pembuatan situs dan **tidak boleh dipalsukan**. Ganti dengan data asli:

| Tempat | File yang perlu diedit | Keterangan |
| --- | --- | --- |
| **Logo resmi** (`logo.jpeg`) | Sudah terpasang di header, hero, & footer semua halaman | Jika logo diperbarui, ganti file `logo.jpeg` di root |
| **Icon situs / favicon** | `assets/img/favicon.png`, `assets/img/apple-touch-icon.png` | Dibuat dari **STAMP.png** (stempel); jalankan ulang konversi jika stempel diganti |
| **Font judul** (`title font.jpeg`) | `css/tokens.css` → `--font-brush` | Judul memakai **Playfair Display** (serif profesional); `title font.jpeg` hanyalah referensi visual |
| **Stempel resmi** (`STAMP.png`) | `assets/img/stamp.png` (versi transparan) | Digunakan pada kartu, foto, dan jalur pendaftaran; jika stempel baru, ganti file `STAMP.png` di root lalu ulangi konversi transparan |
| **Kontak** | Footer semua halaman, `tentang.html` | Contact person **Lanny**, telepon/WA **0812 3566 9988** — sudah terpasang |
| **Media sosial** | Footer semua halaman | Hanya **Instagram @icatijatim** (tanpa email) — sudah terpasang |
| **Kebijakan Privasi** | Footer semua halaman | Tautan `href="#"` menuju halaman/situs kebijakan |
| **Data alumni Discipleship** | `discipleship.html` | Nama/foto/universitas masih placeholder `[NAMA ALUMNI]`; sudah ada karosel `< >` + pencarian nama |
| **Rincian beasiswa & kuliah** | `pendaftaran.html` | Sudah diisi dari **PANDUAN KOMPREHENSIF** (jalur GRSQ/Mandiri, beasiswa ICATI/OCAC/internal, dokumen, bahasa); perbarui jika panduan baru terbit |
| **Bagian Universitas Unggulan** | `pendaftaran.html` | Tabel linimasa OC Mandiri (TA 2027) dari Panduan Komprehensif — perbarui tanggal/link jika berubah |
| **Foto dokumentasi** | Semua `assets/img/placeholder-photo.svg` | Ganti dengan foto asli (format 4:3, 1:1, atau 3:4 sesuai konteks) |
| **Domain resmi** | `sitemap.xml`, `robots.txt`, tag `<link rel="canonical">` | Ganti `https://www.icati.example/` dengan domain asli |

## Palet & Tipografi

- Kertas beras `#F4F0E7`, kabut `#D8DAD5`, biru-abu `#AEBFC0`, arang `#272824`, cokelat `#8C765D`, zaitun `#73745E`, aksen sinabar `#A94332`.
- Judul: **Playfair Display** · Isi: **Source Serif 4** · Label/UI: **Inter**.

## Catatan

- Semua teks antarmuka dalam **Bahasa Indonesia**.
- Istilah **"Discipleship"** dipertahankan sebagai nama program.
- Fakta organisasi diambil dari `ICATI.jpeg` (OCR) — jangan menambah fakta yang tidak tersedia.
- Kontak yang sudah tersedia: Kedungsari 45 Surabaya, Senin–Jumat 09.00–16.00, contact person **Lanny** (telepon/WA **0812 3566 9988**).
- Judul memakai **Playfair Display** (serif profesional); isi memakai **Source Serif 4**; label memakai **Inter**.
- Hero besar hanya ada di **Beranda**; halaman lain memakai judul bagian biasa.
- Konten pendaftaran & tabel universitas diambil dari **PANDUAN KOMPREHENSIF PERGURUAN TINGGI TAIWAN.pdf** (AY 2027, intake musim gugur).
- **Panduan & brosur universitas** digabung ke halaman **Galeri** (`poster.html`, bagian bawah).

## Menambah Poster Baru (halaman Galeri)

1. Taruh file JPG baru ke folder `POSTERS/`.
2. Tambahkan nama filenya ke array `window.ICATI_POSTERS` di `poster.html`.
3. Urutan di galeri otomatis diurutkan dari yang terbaru (dari tanggal pada nama file).
