import { con } from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("usuario");

export const deleteUsuarioV2 = async (req, res) => {
    const usuarioId = parseInt(req.params.id);

    try {
        const result = await collection.deleteOne({ id: usuarioId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Usuario not found" });
        }

        res.status(200).json({ message: "Usuario deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting usuario", error: error.message });
    }
};

export const getUsuarioV2 = async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    let result = await collection.find({ id: usuarioId }).toArray();
    res.send(result);
}