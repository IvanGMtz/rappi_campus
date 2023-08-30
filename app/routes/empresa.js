import express from "express";
import {getUsuarioV1} from "../controllers/v1/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getEmpresaV1, postEmpresaV1 } from "../controllers/v1/empresa.js";

const version = routesVersioning();
const appEmpresa = express.Router();
appEmpresa.use(validarToken);

appEmpresa.get("/", version({
    "^1.0.0": getEmpresaV1
})); 

appEmpresa.post("/", version({
    "^1.0.0": postEmpresaV1
})); 

export default appEmpresa;