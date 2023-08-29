import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("empresa");

export const getCatalogoV1 = async (req, res)=>{
    let result = await collection.aggregate([
        {
            $lookup: {
                from: "producto",
                localField: "id",
                foreignField: "id_Empresa",
                as: "productos",
            },
        },
        {
            $project: {
                _id: 0,
                nombre: 1,
                direccion: 1,
                "productos.nombre": 1,
                "productos.precio": 1,
            },
        },
    ]).toArray();
    res.send(result);
}
