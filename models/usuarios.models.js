import orm from "../config/sequelize.js"
import { DataTypes } from "sequelize";


export const Usuario = orm.define('Usuario', {
    idusers: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { len: [5, 100] } // mínimo 5 caracteres, máximo 50
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    rol: {
        type: DataTypes.STRING(100),
    },
    blocked: {
        type: DataTypes.BOOLEAN
    }
/*     role: {
        type: DataTypes.ENUM('admin', 'super', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    refresh_token: {
        type: DataTypes.STRING(512),
        allowNull: true
    } */
}, {
    tableName: 'users',  // nombre en la BD
    timestamps: false,   // false Si no tienes createdAt/updatedAt
    underscored: true    // convierte nombres a snake_case, si faltara
});

export const login = async function(objUsuario) {
    console.log("------------model------------");
    const results = await Usuario.findAll({
        where:{
            email:objUsuario.email,
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
};