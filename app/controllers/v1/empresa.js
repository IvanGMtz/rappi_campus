import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("empresa");

export const getEmpresaV1 = async (req, res)=>{
    let result = await collection.find().toArray();
    res.send(result);
}

export const postEmpresaV1 = async (req, res) => {
    try {
        let data = req.body
        let newId = await siguienteId("pedido");
        let insert = await collection.insertOne(
            {
                id: newId,
                nombre: data.nombre,
                ciudad: data.ciudad,
                direccion: data.direccion,
                telefono: data.telefono,
                rol: 2,
                
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

export const putEmpresaV1 = async (req, res) => {
    let { id } = req.data.payload
    try {
        await Promise.all([
            body('tipoProducto').notEmpty().run(req),
            body('nombre').notEmpty().run(req),
            body('descripcion').notEmpty().run(req),
            body('precio').isNumeric().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const nuevoProducto = {
            id: req.body.id,
            id_Empresa: Number(id),
            tipoProducto: req.body.tipoProducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        };
        const result = await collection.updateOne(
            {
                id: { $eq: req.body.id }
            }, {
                $set:nuevoProducto
            }
            );
            console.log("aqui");
        res.status(201).json({ message: "Producto updated successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding producto", error: error.message });
    }
};

