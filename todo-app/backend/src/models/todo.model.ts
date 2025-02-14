import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Joi from 'joi';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;
}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'Todos' }
);


export const todoSchema = Joi.object({
  userId: Joi.any(),
  title: Joi.string().required(),
  completed: Joi.boolean().optional(),
});

export default Todo;
