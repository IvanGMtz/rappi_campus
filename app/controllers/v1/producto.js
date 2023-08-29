import { con } from "../../../config/connection/atlas.js";
import { siguienteId } from '../../helpers/counter.js'
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("producto");

export const getProductoV1 = async (req, res) => {
    let { id } = req.data.payload
    let result = await collection.find({ id_Empresa: Number(id) }).toArray();
    res.send(result);
}

export const postProductoV1 = async (req, res) => {
    let { id } = req.data.payload
    try {
        await Promise.all([
            body('tipoProducto').notEmpty().run(req),
            body('nombre').notEmpty().run(req),
            body('descripcion').notEmpty().run(req),
            body('precio').isNumeric().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevoProducto = {
            id: await siguienteId("producto"),
            id_Empresa: Number(id),
            tipoProducto: req.body.tipoProducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
        };

        const result = await collection.insertOne(nuevoProducto);
        res.status(201).json({ message: "Producto added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding producto", error: error.message });
    }
};

export const putProductoV1 = async (req, res) => {
    let { id } = req.data.payload
    try {
        await Promise.all([
            body('tipoProducto').notEmpty().run(req),
            body('nombre').notEmpty().run(req),
            body('descripcion').notEmpty().run(req),
            body('precio').isNumeric().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
console.log(id);
        const nuevoProducto = {
            id: req.body.id,
            id_Empresa: Number(id),
            tipoProducto: req.body.tipoProducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        };
        const result = await collection.updateOne(
            {
                id: { $eq: req.body.id }
            }, {
                $set:{ id: req.body.id,
                    id_Empresa: Number(id),
                    tipoProducto: req.body.tipoProducto,
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio}
            }
            );
            console.log("aqui");
        res.status(201).json({ message: "Producto added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding producto", error: error.message });
    }
};
