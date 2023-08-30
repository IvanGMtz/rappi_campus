import express from "express";
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
import { deleterappiTenderoV1, getRappiTenderoV1, postRappiTenderoV1, updaterappiTenderoV1} from "../controllers/v1/rappiTendero.js";

const version = routesVersioning();
const apprappiTendero = express.Router();
// apprappiTendero.use(validarToken);

apprappiTendero.get("/", version({
    "^1.0.0": getRappiTenderoV1
})); 

apprappiTendero.post("/", version({
    "^1.0.0": postRappiTenderoV1
})); 

apprappiTendero.put("/", version({
    "^1.0.0": updaterappiTenderoV1
})); 

apprappiTendero.delete("/", version({
    "^1.0.0": deleterappiTenderoV1
})); 
export default apprappiTendero;