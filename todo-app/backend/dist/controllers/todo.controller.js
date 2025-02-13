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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_model_1.default.findAll();
    res.json(todos);
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const todo = yield todo_model_1.default.create({ title });
    res.json(todo);
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { completed } = req.body;
    yield todo_model_1.default.update({ completed }, { where: { id } });
    res.json({ message: 'Updated successfully' });
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield todo_model_1.default.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
});
exports.deleteTodo = deleteTodo;
