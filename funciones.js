
const Producto = require('./classes/producto');
const Transaccion = require('./classes/transaccion');

// Producto

const crearProducto = (nombre, descripcion, precioUnitario, stock ) => {
    const producto = new Producto(nombre, descripcion, precioUnitario, stock);
    producto.show();
    return producto.agregarProducto();
}


// Transaccion
 
const crearTransaccion = (idProducto, cantProd, precioUnitario, tipoTransaccion, tipoIVA, subtotal, fecha) => {
    const transaccion = new Transaccion(idProducto, cantProd, precioUnitario, tipoTransaccion, tipoIVA, subtotal, fecha);
    if (transaccion.actualizarStock()) {
        return transaccion.agregarTransaccion(); 
 
    }
    return false;
}

module.exports = {
    crearProducto,
    crearTransaccion
}