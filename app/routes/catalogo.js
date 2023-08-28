getCatalogoV1

import express from "express";
import {getUsuarioV1} from "../controllers/v1/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getCatalogoV1 } from "../controllers/v1/catalogo.js";

const version = routesVersioning();
const appUsuario = express.Router();
appUsuario.use(validarToken);

appUsuario.get("/", version({
    "^1.0.0": getCatalogoV1
})); 

export default appUsuario;