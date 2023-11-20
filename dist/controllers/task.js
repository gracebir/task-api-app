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
    const { content } = req.body;
    const userId = parseInt(req.params.userId);
    try {
        if (!content)
            return res.status(400).json({ error: "content can not be empty" });
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
    const userId = parseInt(req.params.taskId);
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
    const taskId = req.params.taskId;
    const { isCompleted } = req.body;
    try {
        const existingTask = yield prisma.task.findUnique({
            where: {
                id: parseInt(taskId),
            },
        });
        if (!existingTask) {
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
