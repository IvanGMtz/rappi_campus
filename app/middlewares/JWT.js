import { con } from "../../config/connection/atlas.js";
import { SignJWT, jwtVerify } from "jose";
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";
dotenv.config();

const conexionDB = await con();

const crearToken = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) return res.status(400).send({ message: "Data not sent" });
    try {
        const result = await conexionDB.collection(req.query.rol).findOne(req.body);
        const {_id, id, rol} = result;
        const encoder = new TextEncoder();
        const jwtconstructor = await new SignJWT({ _id: new ObjectId(_id),id: id.toString(), rol:rol });
        const jwt = await jwtconstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("3h")
            .sign(encoder.encode(process.env.JWT_PASSWORD));
        res.send(jwt);
    } catch (error) {
        res.status(404).send({ status: 404, message: "Collection not found" });
    }
    next();
};

const validarToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send({ status: 400, token: "Token not sent" });
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PASSWORD)
        );
        req.data = jwtData;
        const roleId = jwtData.payload.rol;
        const role = await conexionDB.collection('rol').findOne({ id: roleId });
        const allowedEndpoints = Object.keys(role.permisos);
        
        if (!allowedEndpoints.includes("/*")) {
            if (!allowedEndpoints.includes(req.baseUrl)) {
                return res.json({ status: 404, message: 'The endpoint is not allowed' });
            }
            
            const allowedVersions = role.permisos[req.baseUrl];
            if (!allowedVersions.includes(req.headers["accept-version"])) {
                return res.json({ status: 404, message: 'The version is not allowed' });
            }

            const allowedMethods = role.permisos[req.baseUrl];
            const currentMethod = req.method.toLowerCase();
            if (!allowedMethods.includes(currentMethod)) {
                return res.json({ status: 404, message: 'The method is not allowed' });
            }
        }
        
        next();
    } catch (error) {
        res.status(498).json({ status: 498, message: error.message });
    }
};

export {
    crearToken,
    validarToken
};
