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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { content } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const task = yield prisma.task.create({
            data: {
                content,
                isCompleted: false,
                userId,
            },
        });
        res.json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                userId,
            },
        });
        res.json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllTasks = getAllTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const taskId = req.params.taskId;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const { isCompleted } = req.body;
    try {
        const existingTask = yield prisma.task.findUnique({
            where: {
                id: parseInt(taskId),
            },
        });
        if (!existingTask || existingTask.userId !== userId) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = yield prisma.task.update({
            where: {
                id: parseInt(taskId),
            },
            data: {
                isCompleted: isCompleted !== undefined ? isCompleted : existingTask.isCompleted,
            },
        });
        res.json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateTask = updateTask;
