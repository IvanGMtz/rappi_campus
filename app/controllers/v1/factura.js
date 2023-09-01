import {con} from "../../../config/connection/atlas.js";
 import {siguienteId} from '../../helpers/counter.js'
import {body, validationResult} from 'express-validator';

let db = await con();
let collection = db.collection("factura");

export const getFacturaV1 = async (req, res) => {
    if (req.data.payload.rol === 2) {
        let result = await collection.find().toArray();
        res.send(result);
    } else {
        let { id } = req.data.payload
        let result = await collection.find({ id: Number(id) }).toArray();
        res.send(result);  
    }
};



