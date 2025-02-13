import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Joi from 'joi';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: 'todos' }
);

export const todoSchema = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().optional(),
});

export default Todo;
