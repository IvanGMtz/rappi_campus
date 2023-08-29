import { con } from "../../../config/connection/atlas.js";
import { siguienteId } from "../../helpers/counter.js";

let db = await con();
let collection = db.collection("catalogo");

export const getCatalogoV1 = async (req, res) => {
    let result = await collection.find().toArray();
    res.send(result);
}

export const postCatalogoV1 = async (req, res) => {
    try {
        let data = req.body
        let newId = await siguienteId("catalogo")
        let insert = await collection.insertOne(
            {
                id: newId,
                id_Empresa: data.id_Empresa,
                tipoProducto: data.tipoProducto,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio
            }
        )
        if (insert.insertedId !== undefined) {
            res.send({ status: 200, message: "entered the data correctly", insert });
        }
        else {
            res.status(400).send({ message: "Error at entered the data" })
        }
    } catch (error) {
        res.status(400).send({ error: error });

    }
}