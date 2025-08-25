import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Product = orm.define(
  "products",
  {
    idproducts: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50] },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1, 100] },
    }
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

export const connect = async function () {
  try {
    await orm.authenticate();
    console.log("Connected");
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getAll = async () => {
  const result = await Product.findAll();
  return result.map((u) => u.toJSON());
};

export const getById = async (id) => {
  const result = await Product.findByPk(id);
  return result ? result.toJSON() : null;
};

export const create = async (objProducto) => {
  const nuevo = await Product.create({
    name: objProducto.name,
    price: objProducto.price,
    description: objProducto.description,
  });
  return nuevo;
};

export const update = async (id, objProducto) => {
  const updatedProduct = await Product.update(
    {
      name: objProducto.name,
      price: objProducto.price,
      description: objProducto.description,
    },
    { where: { idproducts: id } }
  );
  return updatedProduct;
};

export const updateImage = async function(id, filename) {
  try {
    const [updatedRows] = await Product.update({
      image: filename
    }, {
      where: {
        idproducts: id
      }
    });
    console.log(updatedRows);
    return updatedRows;
  } catch(error){
    console.error("Error: ", error);
    throw error;
  }
}

export const deletes = async (id) => {
  const rows = await Product.destroy({ where: { idproducts: id } });
  return rows;
};
