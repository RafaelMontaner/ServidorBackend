/*const http = require('http')

const PORT = 8080

const server = http.createServer((req,res) => {
    res.end("Desde Node")
})

const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port} `)
})*/

// app.js
// app.js
const express = require('express');
const fs = require('fs');
const Contenedor = require('./contenedor');

const app = express();
const port = 8080;

const contenedor = new Contenedor('productos.txt');

app.get('/productos', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    const randomIndex = Math.floor(Math.random() * productos.length);
    const randomProduct = productos[randomIndex];
    res.json(randomProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
