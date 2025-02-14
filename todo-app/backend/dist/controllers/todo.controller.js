"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_model_1 = __importStar(require("../models/todo.model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_model_1.default.findAll();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = todo_model_1.todoSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        const { title } = req.body;
        const todo = yield todo_model_1.default.create({ title });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create todo' });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { completed, title } = req.body;
        const { error } = todo_model_1.todoSchema.validate({ completed, title });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        const todo = yield todo_model_1.default.findByPk(id);
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        yield todo.update({ completed, title });
        res.json({ message: 'Updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update todo' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_model_1.default.findByPk(id);
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        yield todo.destroy();
        res.json({ message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete todo' });
    }
});
exports.deleteTodo = deleteTodo;
