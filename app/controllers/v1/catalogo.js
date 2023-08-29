import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("catalogo");

export const getCatalogoV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
}