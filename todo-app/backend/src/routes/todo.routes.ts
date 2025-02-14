import { Router } from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';

const router = Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.patch('/', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
