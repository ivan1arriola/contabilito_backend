const fs = require('fs');

class Transaccion {
    constructor(idProducto, cantProd, precioUnitario, tipoTransaccion, tipoIVA, subtotal, fecha, id=false) {
        if (id) {
            this.id = id;
        } else {
            this.id = Math.floor(Math.random() * 1000);
        }
        this.idProducto = idProducto;
        this.cantProd = cantProd;
        this.precioUnitario = precioUnitario;
        this.tipoTransaccion = tipoTransaccion;
        this.tipoIVA = tipoIVA;
        this.subtotal = subtotal;
        this.fecha = fecha;

    }

    agregarTransaccion() {
        const data = fs.readFileSync('./data/transacciones.json', 'utf-8');
        const transacciones = JSON.parse(data);
        transacciones.push(this);
        fs.writeFileSync('./data/transacciones.json', JSON.stringify(transacciones));
        return this;
    }

    traerProducto () {
        const data = fs.readFileSync('./data/productos.json', 'utf-8');
        const productos = JSON.parse(data);
        const producto = productos.find(producto => producto.id == this.idProducto);
        if(!producto) return false;
        const Producto = require('./producto');
        return new Producto(producto.nombre, producto.descripcion, producto.precioUnitario, producto.stock, producto.id);
    } 

    actualizarStock() {
        const producto = this.traerProducto();
        console.log("producto", producto)
        if(!producto) return false;
        let isOk = false;
        this.show();
        if (this.tipoTransaccion === 'Venta' || this.tipoTransaccion === 'venta') {
            isOk = producto.disminuirStock(this.cantProd);
        }
        if (this.tipoTransaccion === 'Compra' || this.tipoTransaccion === 'compra') {
            isOk = producto.aumentarStock(this.cantProd);
        }
        if (isOk)
            producto.actualizarProducto();
        return isOk
    }

    show () {
        console.log(this);
    }

}

module.exports = Transaccion;