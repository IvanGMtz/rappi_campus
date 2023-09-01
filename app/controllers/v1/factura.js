import {con} from "../../../config/connection/atlas.js";
 import {siguienteId} from '../../helpers/counter.js'
import {body, validationResult} from 'express-validator';

let db = await con();
let collection = db.collection("factura");

export const getFacturaV1 = async (req, res) => {
  let result = await collection.aggregate([
        {
            $lookup: {
                from: "producto",
                localField: "id_producto.id_Producto",
                foreignField: "id",
                as: "productos"
            }
        },
        {
            $lookup: {
                from: "empresa",
                localField: "id_empresa",
                foreignField: "id",
                as: "empresa"
            }
        },
        {
            $lookup: {
                from: "usuario",
                localField: "id_cliente",
                foreignField: "id",
                as: "cliente"
            }
        },
        {
            $lookup: {
                from: "rappiTendero",
                localField: "id_rappiTendero",
                foreignField: "id",
                as: "rappiTendero"
            }
        },
        {
            $unwind: "$productos"
        },
        {
            $unwind: "$empresa"
        },
        {
            $unwind: "$cliente"
        },
        {
            $unwind: "$rappiTendero"
        },
        {
            $project: {
                _id: 0,
                "Factura ID": "$id",
                "Fecha de Factura": "$fecha",
                "Cliente": {
                    "Nombre": "$cliente.nombre",
                    "Apellido": "$cliente.apellido",
                    "Email": "$cliente.email",
                    "Departamento": "$cliente.departamento",
                    "Ciudad": "$cliente.ciudad",
                    "Dirección": "$cliente.direccion",
                    "Teléfono": "$cliente.telefono"
                },
                "Empresa": {
                    "Nombre": "$empresa.nombre",
                    "Ciudad": "$empresa.ciudad",
                    "Dirección": "$empresa.direccion",
                    "Teléfono": "$empresa.telefono"
                },
                "RappiTendero": {
                    "Nombre": "$rappiTendero.nombre"
                    
                },
                "Productos": {
                    "ID": "$productos.id",
                    "Tipo de Producto": "$productos.tipoProducto",
                    "Nombre del Producto": "$productos.nombre",
                    "Descripción": "$productos.descripcion",
                    "Precio": "$productos.precio"
                },
                "Total a Pagar": "$totalPago"
            }
        }
    
    
  ]).toArray();
  res.send(result)
};


export const postFacturaV1 =async(req,res)=>{
    try {
        await Promise.all([
            body('id_cliente').notEmpty().isInt().run(req),
            body('id_empresa').notEmpty().isInt().run(req),
            body('id_rappiTendero').notEmpty().isInt().run(req),
            body('fecha').isDate().run(req),
            body('id_producto').isArray({}).run(req),
        
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevafactura = {
            id: await siguienteId("factura"),
            id_cliente: req.body.id_cliente,
            id_empresa: req.body.id_empresa,
            id_rappiTendero: req.body.id_rappiTendero,
            fecha: req.body.fecha,
            id_producto: req.body.id_producto,
            
        };

        const result = await collection.insertOne(nuevafactura);
        res.status(201).json({ message: "factura added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding factura", error: error.message });
    }
};




