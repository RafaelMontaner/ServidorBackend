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
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas para productos
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

const productsFilePath = path.join(__dirname, 'productos.json');

productsRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath);
        const products = JSON.parse(data);
        const limit = req.query.limit || products.length;
        res.json(products.slice(0, limit));
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath);
        const products = JSON.parse(data);
        const product = products.find(p => p.id === req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath);
        const products = JSON.parse(data);
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            ...req.body,
        };
        products.push(newProduct);
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath);
        const products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id === req.params.pid);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...req.body };
            await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
            res.json(products[productIndex]);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath);
        const products = JSON.parse(data);
        const updatedProducts = products.filter(p => p.id !== req.params.pid);
        await fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2));
        res.json({ message: 'Producto eliminado con exito' });
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

// Rutas para carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

const cartsFilePath = path.join(__dirname, 'carrito.json');

cartsRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(cartsFilePath);
        const carts = JSON.parse(data);
        const newCart = {
            id: Math.random().toString(36).substr(2, 9),
            products: [],
        };
        carts.push(newCart);
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const data = await fs.readFile(cartsFilePath);
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id === req.params.cid);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'El carrito no funciona' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const data = await fs.readFile(cartsFilePath);
        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(c => c.id === req.params.cid);
        if (cartIndex !== -1) {
            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: req.params.pid, quantity: 1 });
            }
            await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'El carrito no funciona' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en obtener datos del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
