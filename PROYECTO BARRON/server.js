const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que tu HTML se comunique con este servidor
app.use(express.json());

// 1. Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'angelotes_db'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos angelotes_db!');
});

// 2. Ruta para registrar un nuevo usuario (Recibe ID generado, Nombre de usuario, Correo y Contraseña)
app.post('/api/registrar', (req, res) => {
    const { id_cuenta, username, correo, contrasena } = req.body;

    if (!id_cuenta || !username || !correo || !contrasena) {
        return res.status(400).json({ error: 'Campos incompletos para completar el registro' });
    }

    // Insertamos los 4 valores correspondientes en la tabla usuarios
    const query = 'INSERT INTO usuarios (id_cuenta, usuario, correo, contrasena) VALUES (?, ?, ?, ?)';
    db.query(query, [id_cuenta, username, correo, contrasena], (err, result) => {
        if (err) {
            console.error("Error al insertar en MySQL:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El nombre de usuario o el correo ya están registrados' });
            }
            return res.status(500).json({ error: 'Error al guardar en la base de datos' });
        }
        res.json({ mensaje: 'Usuario guardado con éxito', id: id_cuenta });
    });
});

// 3. Ruta para el inicio de sesión (Permite validar por nombre de usuario O por correo electrónico)
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Evaluamos si lo ingresado en el campo coincide con la columna 'usuario' o la columna 'correo'
    const query = 'SELECT * FROM usuarios WHERE (usuario = ? OR correo = ?) AND contrasena = ?';
    db.query(query, [usuario, usuario, contrasena], (err, results) => {
        if (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        
        if (results.length > 0) {
            res.json({ login: true, usuario: results[0].usuario });
        } else {
            res.json({ login: false });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor backend corriendo en http://localhost:3000');
});