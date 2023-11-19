"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key_secret = process.env.secret_key;
function authorization(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(502).json({ msg: 'no token access denied' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, key_secret);
        req.user = decoded;
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.default = authorization;
