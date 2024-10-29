const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Ruta completa a la base de datos
const dbPath = path.join('C:/Users/lcofre/OneDrive - Copahue/Desktop/APIS/APIS/registros', 'database');

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Ruta para obtener datos de la base de datos
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM tu_tabla'; // Reemplaza 'tu_tabla' con el nombre de tu tabla
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
