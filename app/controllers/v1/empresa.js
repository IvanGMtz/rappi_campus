import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("empresa");

export const getEmpresaV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
}
