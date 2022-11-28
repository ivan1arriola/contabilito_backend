const fs = require('fs');

class Producto {

    constructor(nombre, descripcion, precioUnitario, stock, id = false) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioUnitario = precioUnitario;
        this.stock = stock;
        if (id) {
            this.id = id;
        } else {
            this.id = Math.floor(Math.random() * 1000)
        }
    }

    agregarProducto() {
        const data = fs.readFileSync('./data/productos.json', 'utf-8');
        const productos = JSON.parse(data);
        productos.push(this);
        fs.writeFileSync('./data/productos.json', JSON.stringify(productos));
        return this;
    }

    disminuirStock(cantProd) {
        let newStock = Number(this.stock) - Number(cantProd);
        if (newStock < 0) return false;
        this.stock = newStock;
        return true; 
    }

    aumentarStock(cantProd) {
        this.stock = Number(this.stock) + Number(cantProd);
        return true;
    }

    actualizarProducto() {
        const data = fs.readFileSync('./data/productos.json', 'utf-8');
        const productos = JSON.parse(data);
        const index = productos.findIndex(producto => producto.id === this.id);
        productos[index] = this;
        fs.writeFileSync('./data/productos.json', JSON.stringify(productos));
        return this;
    }

    show() {
        console.log(this);
    }
}

module.exports = Producto;