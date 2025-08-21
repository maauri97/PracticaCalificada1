import { Sequelize } from "sequelize";

const orm = new Sequelize('practica','root','root',{host: 'localhost', dialect: 'mysql'});

export default orm;