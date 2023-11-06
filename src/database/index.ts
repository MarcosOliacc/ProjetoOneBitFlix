import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/environment";

export const sequlize = new Sequelize(DATABASE_URL,{
    define: {
        underscored: true // vai converter os nomes das propriedades de snake_case para camelCase
    }

})