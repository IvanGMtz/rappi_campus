import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("pedido");

export const getPedidoV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
    
}

