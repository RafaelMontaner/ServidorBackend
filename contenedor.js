// contenedor.js
const fs = require('fs');

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }
}

module.exports = Contenedor;
