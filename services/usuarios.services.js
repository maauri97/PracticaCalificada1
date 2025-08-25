import * as modelUser from "../models/usuarios.models.js";

// Obtener todos los usuarios
export const getAllUsers = async () => {
    return await modelUser.Usuario.findAll({
        attributes: { exclude: ['password'] }
    });
};

// Obtener usuario por id
export const getUserById = async (id) => {
    return await modelUser.Usuario.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
};

// Crear un usuario y devolverlo sin contraseña
export const createUser = async (data) => {
    const user = await modelUser.Usuario.create(data);
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
};

// Actualizar datos de un usuario
export const updateUserById = async (id, newData) => {
    const user = await modelUser.Usuario.findByPk(id);
    if (!user) return null;
    await user.update(newData);
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
    const user = await modelUser.Usuario.findByPk(id);
    if (!user) return null;
    await user.destroy();
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword; // opcional
};

export const login = async function(objUsuario) {
    console.log("------------service------------");
    let results= await modelUser.login(objUsuario);
    console.log('Login results: ',results);
    return results;
};