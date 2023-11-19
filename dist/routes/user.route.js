"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controllers/register");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.post('/signup', register_1.register);
router.post('/signin', authentication_1.signin);
exports.default = router;
