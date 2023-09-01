import express from "express";
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getFacturaV1 } from "../controllers/v1/factura.js";


const version = routesVersioning();
const appFactura = express.Router();
appFactura.use(validarToken);
 
appFactura.get("/", version({
    "^1.0.0": getFacturaV1
})); 