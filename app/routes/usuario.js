import express from "express";
import {getUsuarioV1} from "../controllers/v1/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";

const version = routesVersioning();
const appUsuario = express.Router();
appUsuario.use(validarToken);

appUsuario.get("/", version({
    "^1.0.0": getUsuarioV1
})); 

export default appUsuario;