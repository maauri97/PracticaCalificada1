import * as modelProduct from "../models/products.models.js";

export const getAll = async function () {
  console.log("------------service------------");
  const results = await modelProduct.getAll();
  return results;
};

export const getById = async function (idproducts) {
  console.log("------------service------------");
  const result = await modelProduct.getById(idproducts);
  return result;
};

export const create = async function (objProducto) {
  const idproducts = await modelProduct.create(objProducto);
  return idproducts;
};

export const update = async function (idproducts, objProducto) {
  const rows = await modelProduct.update(idproducts, objProducto);
  return rows; 
};

export const deletes = async function (idproducts) {
  const rows = await modelProduct.deletes(idproducts);
  return rows; 
};