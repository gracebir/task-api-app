"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const task_1 = require("../controllers/task");
const router = (0, express_1.Router)();
router.post('/create/:userId', task_1.createTask);
router.get('/:taskId', task_1.getAllTasks);
router.put('/update:taskId', authorization_1.default, task_1.updateTask);
exports.default = router;
