import express from "express";
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { getRappiTenderoV1, postRappiTenderoV1} from "../controllers/v1/rappiTendero.js";

const version = routesVersioning();
const apprappiTendero = express.Router();
// apprappiTendero.use(validarToken);

apprappiTendero.get("/", version({
    "^1.0.0": getRappiTenderoV1
})); 

apprappiTendero.post("/", version({
    "^1.0.0": postRappiTenderoV1
})); 

export default apprappiTendero;