import {Optional, Model, DataTypes } from 'sequelize'
import { sequlize } from '../database'
export interface Category {
    id: number,
    name: string,
    position: number
}
export interface CategoryCreationAttributes extends Optional<Category,'id'>{}

export interface CategoryInstance extends Model<Category,CategoryCreationAttributes>, Category {}

export const Category = sequlize.define<CategoryInstance, Category>('category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
})