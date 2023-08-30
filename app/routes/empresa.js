import express from "express";
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getEmpresaV1, updateEmpresaById } from "../controllers/v1/empresa.js";
import {postEmpresa, deleteEmpresaById} from "../controllers/v2/empresa.js";

const version = routesVersioning();
const appEmpresa = express.Router();
appEmpresa.use(validarToken);

appEmpresa.get("/", version({
    "^1.0.0": getEmpresaV1
})); 

appEmpresa.put("/:id", version({
    "^1.0.0": updateEmpresaById
})); 

appEmpresa.post("/", version({
    "~2.0.1": postEmpresa
}));

appEmpresa.delete("/:id", version({
    "~2.0.1": deleteEmpresaById
}));

export default appEmpresa;