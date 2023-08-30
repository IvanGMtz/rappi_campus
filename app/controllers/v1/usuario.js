import {con} from "../../../config/connection/atlas.js";
import {siguienteId} from '../../helpers/counter.js'
import {body, validationResult} from 'express-validator';

let db = await con();
let collection = db.collection("usuario");

export const getUsuarioV1 = async (req, res) => {
    if (req.data.payload.rol === 1) {
        let result = await collection.find().toArray();
        res.send(result);
    } else {
        let { id } = req.data.payload
        let result = await collection.find({ id: Number(id) }).toArray();
        res.send(result);  
    }
}

export const postUsuarioV1 = async (req, res) => {
    try {
        await Promise.all([
            body('nombre').notEmpty().run(req),
            body('apellido').notEmpty().run(req),
            body('email').isEmail().run(req),
            body('departamento').notEmpty().run(req),
            body('ciudad').notEmpty().run(req),
            body('direccion').notEmpty().run(req),
            body('telefono').isInt().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevoUsuario = {
            id: await siguienteId("usuario"),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol: 4,
        };

        const result = await collection.insertOne(nuevoUsuario);
        res.status(201).json({ message: "Usuario added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding usuario", error: error.message });
    }
};

export const updateUsuarioV1 = async (req, res) => {
    const usuarioId = parseInt(req.params.id);

    try {
        await Promise.all([
            body('nombre').notEmpty().run(req),
            body('apellido').notEmpty().run(req),
            body('email').isEmail().run(req),
            body('departamento').notEmpty().run(req),
            body('ciudad').notEmpty().run(req),
            body('direccion').notEmpty().run(req),
            body('telefono').isInt().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const usuarioActualizado = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol: 4,
        };

        const result = await collection.updateOne({ id: usuarioId }, { $set: usuarioActualizado });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Usuario not found" });
        }

        res.status(200).json({ message: "Usuario updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating usuario", error: error.message });
    }
};