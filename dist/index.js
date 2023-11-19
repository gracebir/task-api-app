"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("task list");
});
app.use('/api/task', task_route_1.default);
app.use('/api/auth', user_route_1.default);
app.listen(port, () => {
    console.log(`server start on ${port}..`);
});
