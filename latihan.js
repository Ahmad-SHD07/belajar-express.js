const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('SELAMAT DATANG GUYS');
});

const catatAktivitas = (req,res, next) => {
    console.log('Ada orang datang');
    next();
}

app.use(catatAktivitas);

app.get('/menu', (req,res) => {
    res.send('Ini menu');
});

app.post('/menu', (req,res) => {
    res.send('Menu telah saya buat');
});

app.listen(port, () => {
    console.log(`Portal ke server sudah saya buka silahkan kunjungi http://localhost:${port}`);
});