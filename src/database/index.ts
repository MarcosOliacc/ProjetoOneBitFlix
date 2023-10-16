import { Sequelize } from "sequelize";

export const sequlize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'onebitflix_development',
    username: 'onebitflix',
    password: 'onebitflix',
    define: {
        underscored: true // vai converter os nomes das propriedades de snake_case para camelCase
    }

})