import { Request, Response } from 'express';
import Todo, { todoSchema } from '../models/todo.model';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Something went wrong' });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body;

    const { error } = todoSchema.validate({ completed, title });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    await todo.update({ completed, title });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    await todo.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Failed to delete todo' });
  }
};
