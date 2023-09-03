import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("empresa");

export const getEmpresaV1 = async (req, res) => {
    if (req.data.payload.rol === 1) {
        let result = await collection.find().toArray();
        res.send(result);
    } else {
        let { id } = req.data.payload
        let result = await collection.find({ id: Number(id) }).toArray();
        res.send(result);
    }
}

export const updateEmpresaById = async (req, res) => {
    try {

        const id_Empresa = parseInt(req.params.id);

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

        const empresaActualizada = {
            nombre: req.body.nombre,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        };

        const result = await collection.updateOne({ id: id_Empresa }, { $set: empresaActualizada });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Empresa not found" });
        }

        res.status(200).json({ message: "Empresa updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating empresa", error: error.message });
    }
};

export const deleteEmpresaV1 = async (req, res) => {

    try {
        const result = await collection.deleteOne({ id: req.body.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "empresa not found" });
        }

        res.status(200).json({ message: "empresa deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting empresa", error: error.message });
    }
};