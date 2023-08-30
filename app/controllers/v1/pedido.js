import {con} from "../../../config/connection/atlas.js";
import { siguienteId } from "../../helpers/counter.js";
import {body, validationResult} from 'express-validator';


let db = await con();
let collection = db.collection("pedido");

export const getPedidoV1 = async (req, res)=>{
    let result = await collection.aggregate([
        {
            $unwind: '$productos'
        },
        {
            $lookup: {
                from: 'producto', 
                localField: 'productos.id_Producto',
                foreignField: 'id',
                as: 'productInfo'
            }
        },
        {
            $unwind: '$productInfo'
        },
        {
            $addFields: {
                'productos.nombreProducto': '$productInfo.nombre',
                'productos.valor': { $multiply: ['$productos.cantidad', '$productInfo.precio'] }
            }
        },
        {
            $group: {
                _id: '$_id',
                id: { $first: '$id' },
                id_cliente: { $first: '$id_cliente' },
                id_rappiTendero: { $first: '$id_rappiTendero' },
                id_Empresa: { $first: '$id_Empresa' },
                fecha: { $first: '$fecha' },
                productos: { $push: '$productos' },
                valorTotal: { $sum: '$productos.valor' }
            }
        }
    ]).toArray();
    res.send(result);
    
}

export const postPedidoV1 = async (req, res) => {
    let {id} = req.data.payload
    try {
        await Promise.all([
            body('id_rappiTendero').notEmpty().isInt().run(req),
            body('id_Empresa').notEmpty().isInt().run(req),
            body('productos').isArray({}).run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const nuevoPedido = {
            id: await siguienteId("pedido"),
            id_cliente: Number(id),
            id_rappiTendero: req.body.id_rappiTendero,
            id_Empresa: req.body.id_Empresa,
            fecha: new Date(Date.now()),
            productos: req.body.productos,
        };

        const result = await collection.insertOne(nuevoPedido);
        res.status(201).json({ message: "Pedido added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding pedido", error: error.message });
    }
};
