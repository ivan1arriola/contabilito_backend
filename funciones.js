const fs = require('fs');

// Producto

const agregarProductoNuevo = (producto) => {
    const data = fs.readFileSync('./data/productos.json', 'utf-8');
    const productos = JSON.parse(data);
    productos.push(producto);
    fs.writeFileSync('./data/productos.json', JSON.stringify(productos));
}

const crearProducto = (nombre, descripcion, precioUnitario, stock ) => {
    const producto = {
        id: Math.floor(Math.random() * 1000),
        nombre,
        descripcion,
        precioUnitario,
        stock
    }
    agregarProductoNuevo(producto);
    return producto;
}

const actualizarStock = (idProducto, cantProd) => {
    const data = fs.readFileSync('./data/productos.json', 'utf-8');
    const productos = JSON.parse(data);
    const producto = productos.find(producto => producto.id == idProducto);
    if (producto.stock + cantProd < 0) return false;
    producto.stock = producto.stock - cantProd;
    fs.writeFileSync('./data/productos.json', JSON.stringify(productos));
    return true;
}

// Transaccion

const agregarTransaccion = (transaccion) => {
    const data = fs.readFileSync('./data/transacciones.json', 'utf-8');
    const transacciones = JSON.parse(data);
    transacciones.push(transaccion);
    fs.writeFileSync('./data/transacciones.json', JSON.stringify(transacciones));
}

const crearTransaccion = (idProducto, cantProd, precioUnitario, fecha, tipoTransaccion, tipoIVA, subtotal) => {
    const transaccion = {
        idProducto,
        cantProd,
        precioUnitario,
        tipoTransaccion,
        tipoIVA,
        subtotal,
        fecha,
        id: Math.floor(Math.random() * 1000),
    }
    let res;
    if (tipoTransaccion === 'Venta' || tipoTransaccion === 'venta') {
        res = actualizarStock(idProducto, -cantProd);
    }
    if (tipoTransaccion === 'Compra' || tipoTransaccion === 'compra') {
        res = actualizarStock(idProducto, cantProd);
    }
    if(!res) return false;
    agregarTransaccion(transaccion);
    return transaccion;
    
}

module.exports = {
    crearProducto,
    crearTransaccion
}