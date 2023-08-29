getCatalogoV1

import express from "express";
import {getUsuarioV1} from "../controllers/v1/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getCatalogoV1, postCatalogoV1 } from "../controllers/v1/catalogo.js";

const version = routesVersioning();
const appCatalogo= express.Router();
appCatalogo.use(validarToken);

appCatalogo.get("/", version({
    "^1.0.0": getCatalogoV1
})); 

appCatalogo.post("/", version({
    "^1.0.0": postCatalogoV1
})); 

export default appCatalogo;