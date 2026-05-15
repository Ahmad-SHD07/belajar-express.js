const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3000;
const mysql = require('mysql2');


app.use(express.json());

const KUNCI_RAHASIA = 'rahasia_aku_dan_kamu';

const satpamRestoran = (req, res, next) => {
    console.log('SATPAM: Mengecek pelanggan yang datang');
    next();
}

app.use(satpamRestoran);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kasir'
});

db.connect(err => {
    if (err) {
        console.log('KASIR GAGAL: Tidak bisa masuk ke gudang MySQL!', err.message);
    } else {
        console.log('KASIR SUKSES: Berhasil terhubung ke gudang MySQL!');
    }
});

app.get('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === '291107') {
        const token = jwt.sign({username: username}, KUNCI_RAHASIA);

        res.json({
            pesan: 'Login berhasil! ini tiket jwt kamu',
            token: token
        });
    } else {
        res.status(401).json({
            pesan: 'Username atau password salah!'
        });
    }
});

const cekToken = (req, res, next) => {
    const headerAuth = req.headers['authorization'];

    if (!headerAuth) {
        return res.status(403).json({
            pesan: 'Akses ditolak! kamu tidak dapat bawa tiket JWT.'
        });
    }

    const tokenAsli = headerAuth.split(' ')[1];

    jwt.verify(tokenAsli, KUNCI_RAHASIA, (err, decoded) => {
        if (err) {
            return res.status(401),json ({
                pesan: 'Tiket palsu atau sudah kedaluwarsa!'
            })
        }
    });
}

app.get('/', (req, res) => {
    res.send('Selamat datang di Restoran Express pertamaku!!');
});


app.get('/produk:id', (req, res) => {
    console.log('KASIR: Melayani pesanan GET')
    const idProduk = req.params.id;
    res.send(`KASIR: Mengambil data produk dengan ID yang di pilih yaitu: ${idProduk}`);
});

app.get('/cari', (req, res) => {
    const kategori = req.query.kategori;
    const harga = req.query.harga;
    res.send(`KASIR: Mencari produk dengan kategori ${kategori} dan harga ${harga}`)
})

app.post('/tambah-produk', (req,res) => {
    console.log('KASIR: Melayani pesanan POST')

    const namaProduk = req.body.nama;
    const hargaProduk = req.body.harga;

    const sql = 'INSERT INTO produk (nama, harga) VALUES (?, ?)';

    db.query(sql, [namaProduk, hargaProduk], (err, result) => {
        if (err) {
            console.log(err);
            res.send('Gagal menyimpan data!');
        } else {
            res.send(`Sukses! Produk ${namaProduk} disimpan dengan ID: ${result.insertId}`);
        }
    });
});

app.get('/produk/:id', (req, res) => {
    const idProduk = req.params.id;
    const sql = 'SELECT * FROM produk WHERE id = ?';

    db.query(sql, [idProduk], (err, results)=> {
    if (err) {
        return res.status(500).json ({
            pesan: 'Terjadi kesalahan pada server kami',
            error: err.message
        });
    }

    if (results.length === 0) {
        return res.status(404).json ({
            pesan: `Maaf, produk dengan ID ${idProduk} tidak ditemukan`
        });
    }

    res.status(200).json({
        pesan: 'Data berhasil di termukan',
        data: results[0]
    });
    });
});

app.put('/produk', (req, res) => {
    const idProduk = req.params.id;
    const namaBaru = req.body.nama;
    const hargaBaru = req.body.harga;

    const sql = 'UPDATE produk SET nama = ?, harga = ? WHERE id = ?'

    db.query(sql, [namaBaru, hargaBaru, idProduk], (err, result) => {
        if (err) {
            console.log('Gagal mengubah data!')
        } else {
            res.send(`Sukses, Produk dengan ID ${idProduk} berhasil di ubah`)
        }
    })
});

app.delete('/produk', (req, res) => {
    const idProduk = req.params.id;

    const sql = 'DELETE FROM produk WHERE id = ?';

    db.query(sql, [idProduk], (err, result) => {
        if (err) {
            console.log('Gagal menghapus data!')
        } else {
            res.send(`Sukses! Produk dengan id ${idProduk} berhasil dihapus.`)
        }
    });
});

app.listen(port, () => {
    console.log(`Server sudah menyala! silahkan kunjungi http://localhost:${port}`)
});