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


export const postFacturaV1 =async(req,res)=>{
    try {
        await Promise.all([
            body('id_cliente').notEmpty().isInt().run(req),
            body('id_empresa').notEmpty().isInt().run(req),
            body('id_rappiTendero').notEmpty().isInt().run(req),
            body('fecha').isDate().run(req),
            body('id_producto').isArray({}).run(req),
        
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevafactura = {
            id: await siguienteId("factura"),
            id_cliente: req.body.id_cliente,
            id_empresa: req.body.id_empresa,
            id_rappiTendero: req.body.id_rappiTendero,
            fecha: req.body.fecha,
            id_producto: req.body.id_producto,
            
        };

        const result = await collection.insertOne(nuevafactura);
        res.status(201).json({ message: "factura added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding factura", error: error.message });
    }
};




