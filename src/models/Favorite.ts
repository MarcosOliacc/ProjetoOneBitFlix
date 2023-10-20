import { DataTypes, Model } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstace } from "./User";
import { sequlize } from "../database";


export interface Favorite {
    userId: number,
    courseId: number
}

export interface FavoriteInstance extends Model<Favorite>,Favorite {
    Course?: CourseInstance
    user?: UserInstace 
}

export const Favotire = sequlize.define<FavoriteInstance, Favorite>('Favorite', {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'users', key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'courses', key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})