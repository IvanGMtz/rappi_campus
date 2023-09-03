import express from "express";
import {deleteProductoV1, getProductoV1, postProductoV1, updateProductoV1} from "../controllers/v1/producto.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";

const version = routesVersioning();
const appProducto = express.Router();
appProducto.use(validarToken);

appProducto.get("/", version({
    "^1.0.0": getProductoV1
})); 

appProducto.post("/", version({
    "^1.0.0": postProductoV1
})); 

appProducto.put("/", version({
    "^1.0.0": updateProductoV1
})); 

appProducto.delete("/", version({
    "^1.0.0": deleteProductoV1
})); 

export default appProducto;
