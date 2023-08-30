import express from "express";
import { getUsuarioV1, postUsuarioV1, updateUsuarioV1 } from "../controllers/v1/usuario.js"
import {deleteUsuarioV2, getUsuarioV2} from "../controllers/v2/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";

const version = routesVersioning();
const appUsuario = express.Router();
appUsuario.use(validarToken);

appUsuario.get("/:id?", version({
    "^1.0.0": getUsuarioV1,
    "~2.0.1": getUsuarioV2
})); 

appUsuario.post("/", version({
    "^1.0.0": postUsuarioV1
})); 

appUsuario.put("/:id", version({
    "^1.0.0": updateUsuarioV1
}));

appUsuario.delete("/:id", version({
    "~2.0.1": deleteUsuarioV2
}));

export default appUsuario;
