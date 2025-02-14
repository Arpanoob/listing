"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const joi_1 = __importDefault(require("joi"));
class Todo extends sequelize_1.Model {
}
Todo.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    completed: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize: database_1.default, tableName: 'todos' });
exports.todoSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    completed: joi_1.default.boolean().optional(),
});
exports.default = Todo;
