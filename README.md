# 🚀 Belajar Express.js

Proyek pembelajaran **Express.js** yang mencakup konsep dasar pembuatan REST API menggunakan Node.js, termasuk middleware, JWT authentication, dan koneksi ke database MySQL.

---

## 📋 Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Modul yang Digunakan](#modul-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Endpoint API](#endpoint-api)
- [Konfigurasi Database](#konfigurasi-database)

---

## ✅ Prasyarat

Pastikan kamu sudah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) (biasanya sudah termasuk dengan Node.js)
- [MySQL](https://www.mysql.com/) (versi 5.7 atau lebih baru)

---

## 📦 Instalasi

1. **Clone repository ini:**

```bash
git clone https://github.com/Ahmad-SHD07/belajar-express.js.git
cd belajar-express.js
```

2. **Install semua dependencies:**

```bash
npm install
```

3. **Siapkan database MySQL** (lihat bagian [Konfigurasi Database](#konfigurasi-database))

---

## ▶️ Cara Menjalankan

### Menjalankan server utama (`index.js`)

```bash
node index.js
```

Server akan berjalan di: **http://localhost:3000**

### Menjalankan file latihan (`latihan.js`)

```bash
node latihan.js
```

Server latihan akan berjalan di: **http://localhost:5000**

---

## 📚 Modul yang Digunakan

| Modul | Versi | Fungsi |
|-------|-------|--------|
| [express](https://expressjs.com/) | `^5.2.1` | Framework web utama untuk membuat server dan routing REST API |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | `^9.0.3` | Membuat dan memverifikasi token JWT untuk autentikasi |
| [mysql2](https://github.com/sidorares/node-mysql2) | `^3.22.3` | Driver MySQL untuk koneksi dan operasi query ke database |

### Cara install manual (jika diperlukan):

```bash
# Install Express.js
npm install express

# Install JSON Web Token
npm install jsonwebtoken

# Install MySQL2
npm install mysql2
```

---

## 📁 Struktur Proyek

```
belajar-express/
├── index.js          # File utama - server Express dengan MySQL & JWT
├── latihan.js        # File latihan - konsep dasar Express & middleware
├── package.json      # Konfigurasi proyek dan daftar dependencies
├── package-lock.json # Lock file untuk versi dependencies
└── README.md         # Dokumentasi proyek
```

---

## 🔌 Endpoint API

Endpoint tersedia di `index.js` (berjalan di port **3000**):

### Authentication

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/login` | Login dengan username & password, mendapatkan token JWT |

**Contoh request body login:**
```json
{
  "username": "admin",
  "password": "291107"
}
```

### Produk (CRUD)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/produk/:id` | Ambil data produk berdasarkan ID |
| `GET` | `/cari?kategori=&harga=` | Cari produk berdasarkan kategori dan harga |
| `POST` | `/tambah-produk` | Tambah produk baru ke database |
| `PUT` | `/produk` | Update data produk |
| `DELETE` | `/produk` | Hapus produk dari database |

### Umum

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/` | Halaman utama / welcome page |

---

## 🗄️ Konfigurasi Database

Proyek ini menggunakan MySQL dengan konfigurasi default berikut (di `index.js`):

```js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',        // Sesuaikan dengan password MySQL kamu
    database: 'db_kasir' // Buat database dengan nama ini
});
```

### Membuat Database dan Tabel

Jalankan query berikut di MySQL:

```sql
CREATE DATABASE db_kasir;

USE db_kasir;

CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL
);
```

> ⚠️ **Catatan:** Sesuaikan `password` di `index.js` dengan password MySQL yang kamu gunakan di mesin lokal.

---

## 🔐 Middleware

Proyek ini menggunakan beberapa middleware:

- **`satpamRestoran`** — Middleware global yang mencatat setiap request yang masuk (logger sederhana)
- **`cekToken`** — Middleware untuk memverifikasi JWT token pada header `Authorization`
- **`express.json()`** — Middleware bawaan Express untuk parsing body JSON

---

## 📝 Konsep yang Dipelajari

- ✅ Setup server dengan Express.js
- ✅ Routing (GET, POST, PUT, DELETE)
- ✅ Middleware (custom & built-in)
- ✅ Parameter URL & Query String
- ✅ JWT Authentication
- ✅ Koneksi MySQL dengan mysql2
- ✅ Operasi CRUD ke database

---

## 👤 Author

**Ahmad SHD07**  
GitHub: [@Ahmad-SHD07](https://github.com/Ahmad-SHD07)
