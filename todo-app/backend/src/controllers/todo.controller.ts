import { Request, Response } from 'express';
import Todo, { todoSchema } from '../models/todo.model';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = (req as AuthenticatedRequest).user;
    console.log(userId, (req as AuthenticatedRequest).user)
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const todos = await Todo.findAll({
      where: { userId },
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "Something went wrong" });
  }
};


export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { userId } = (req as AuthenticatedRequest).user;
    const { title } = req.body;

    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const todo = await Todo.create({ userId, title });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "Failed to create todo" });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = (req as AuthenticatedRequest).user;
    const { completed, title, id } = req.body;


    const { error } = todoSchema.validate({ completed, title });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }


    if (!id) {
      res.status(400).json({ error: "Todo ID is required" });
      return;
    }

    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }


    if (todo.userId !== +userId) {
      res.status(403).json({ error: "Unauthorized to update this todo" });
      return;
    }


    await todo.update({ completed, title });

    res.json({ message: "Updated successfully", todo });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "Failed to update todo" });
  }
};


export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { userId } = (req as AuthenticatedRequest).user;

    if (!id) {
      res.status(400).json({ error: "Todo ID is required" });
      return;
    }

    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    if (todo.userId !== +userId) {
      res.status(403).json({ error: "Unauthorized to delete this todo" });
      return;
    }

    await todo.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "Failed to delete todo" });
  }
};
