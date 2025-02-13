"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/todos', todo_routes_1.default);
database_1.default.sync().then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
