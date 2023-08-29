import {con} from "../../../config/connection/atlas.js";
import { siguienteId } from "../../helpers/counter.js";


let db = await con();
let collection = db.collection("pedido");

export const getPedidoV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
    
}
export const postPedidoV1 = async (req, res) => {
    try {
        let data = req.body
        let newId = await siguienteId("pedido");
        console.log(newId);
        let fecha = new Date(Date.now())
        console.log(fecha);
        let insert = await collection.insertOne(
            {
                id: newId,
                id_Producto: data.id_Producto,
                id_cliente: data.id_cliente,
                id_rappiTendero: data.id_rappiTendero,
                id_Empresa: data.id_Empresa,
                cantidad: data.cantidad,
                fecha:fecha,
                descuento: data.descuento,
                totalPago: data.totalPago
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
