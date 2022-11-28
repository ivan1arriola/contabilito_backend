const express = require("express");
const cors = require("cors");
const morga = require("morgan");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const root = {
  root: "./data",
};

// Settings
app.use(cors());
app.use(morga("dev"));
app.use(express.json());

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// importar modulos
const { crearProducto, crearTransaccion } = require("./funciones");

// Routes Productos
app.get("/productos", (req, res) => {
  res.sendFile("productos.json", root);
});

app.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync("./data/productos.json", "utf-8");
  const productos = JSON.parse(data);
  const producto = productos.find((producto) => producto.id == id);
  res.json(producto);
});

app.post("/productos", (req, res) => {
    const { nombre, descripcion, precioUnitario, stock } = req.body;
    const producto = crearProducto(nombre, descripcion, precioUnitario, stock);
    res.json(producto);
});

// Routes Transacciones

app.get("/transacciones", (req, res) => {
  res.sendFile("transacciones.json", root);
});

app.post("/transacciones", (req, res) => {
    console.log(req.body);
    const { producto:idProducto, fecha, cantProd, precioUnitario, tipoTransaccion, tipoIVA, subtotal } = req.body;
    const transaccion = crearTransaccion(idProducto, cantProd, precioUnitario,fecha, tipoTransaccion, tipoIVA, subtotal);
    if(!transaccion) res.status(400).json({error: "No hay stock"});
    res.json(transaccion);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
