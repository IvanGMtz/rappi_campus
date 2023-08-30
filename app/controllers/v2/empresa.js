import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import { siguienteId } from '../../helpers/counter.js'

let db = await con();
let collection = db.collection("empresa");


export const postEmpresa = async (req, res) => {
    try {

        await Promise.all([
            body('nombre').notEmpty().run(req),
            body('ciudad').notEmpty().run(req),
            body('direccion').notEmpty().run(req),
            body('telefono').isInt().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevaEmpresa = {
            id: await siguienteId("empresa"),
            nombre: req.body.nombre,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol: 2,
        };

        const result = await collection.insertOne(nuevaEmpresa);
        res.status(201).json({ message: "Empresa added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding empresa", error: error.message });
    }
};

export const deleteEmpresaById = async (req, res) => {
    try {

        const idEmpresa = parseInt(req.params.id);

        const result = await collection.deleteOne({ id: idEmpresa });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Empresa not found" });
        }

        res.status(200).json({ message: "Empresa deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting empresa", error: error.message });
    }
};
