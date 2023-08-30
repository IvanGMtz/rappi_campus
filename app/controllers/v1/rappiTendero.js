import { body, validationResult } from 'express-validator';
import { siguienteId } from '../../helpers/counter.js';
import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("rappiTendero");

export const getRappiTenderoV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
    
}

export const postRappiTenderoV1 =async(req,res)=>{
    try {
        await Promise.all([
            body('nombre').notEmpty().run(req),
            body('apellido').notEmpty().run(req),
            body('email').isEmail().run(req),
            body('departamento').notEmpty().run(req),
            body('ciudad').notEmpty().run(req),
            body('direccion').notEmpty().run(req),
            body('telefono').isNumeric().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevorappiTendero = {
            id: await siguienteId("rappiTendero"),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol:3
        };

        const result = await collection.insertOne(nuevorappiTendero);
        res.status(201).json({ message: "rappiTendero added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding rappiTendero", error: error.message });
    }
};


export const updaterappiTenderoV1 = async (req, res) => {

    try {
        await Promise.all([
            body('nombre').notEmpty().run(req),
            body('apellido').notEmpty().run(req),
            body('email').isEmail().run(req),
            body('departamento').notEmpty().run(req),
            body('ciudad').notEmpty().run(req),
            body('direccion').notEmpty().run(req),
            body('telefono').isNumeric().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rappiTenderoActualizado = {
            id: req.body.id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol:3
        };

        const result = await collection.updateOne({ id:req.body.id}, { $set: rappiTenderoActualizado });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Producto not found" });
        }

        res.status(200).json({ message: "Producto updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating producto", error: error.message });
    }
};

export const deleterappiTenderoV1 = async (req, res) => {
    const productoId = parseInt(req.params.id);

    try {
        const result = await collection.deleteOne({ id: productoId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Producto not found" });
        }

        res.status(200).json({ message: "Producto deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting producto", error: error.message });
    }
};


