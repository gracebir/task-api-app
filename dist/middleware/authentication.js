"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const key_secret = process.env.secret_key;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(401).json({ error: "please fill fields!!!" });
        yield prisma.user
            .findUnique({
            where: { email },
        })
            .then((user) => {
            if (!user)
                return res.status(401).json({ error: "User does not exists" });
            bcryptjs_1.default.compare(password, user.password).then((isMatch) => {
                if (!isMatch)
                    return res.status(401).json({ error: "Invalid credentials" });
                jsonwebtoken_1.default.sign({ id: user.id }, key_secret, { expiresIn: "1d" }, (err, token) => {
                    if (err)
                        throw err;
                    res.status(200).json({
                        user: {
                            token,
                            id: user.id,
                            fullname: user.fullname,
                            email: user.email,
                        },
                    });
                });
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.signin = signin;
