import express from "express";
import {getUsuarioV1} from "../controllers/v1/usuario.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getPedidoV1 } from "../controllers/v1/pedido.js";

const version = routesVersioning();
const appPedido = express.Router();
appPedido.use(validarToken);

appPedido.get("/", version({
    "^1.0.0": getPedidoV1
})); 

export default appPedido;