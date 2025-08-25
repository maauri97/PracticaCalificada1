import pool from "../config/db.js";
import * as usersService from "../services/usuarios.services.js";
import * as auth from "../config/auth.js";
// import bcrypt from "bcrypt";

// Autentificar usuario
export const authenticateUser = async (req, res) => {
  console.log("Login: ", req.body);
  const reqUsuario = req.body;

  if (!reqUsuario.email || !reqUsuario.password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    usersService.login(reqUsuario).then(async (usuarios) => {
      console.log("Usuarios: ", usuarios);
      if (usuarios[0]) {
        /*         let encryptedPassword = await bcrypt.hash(reqUsuario.password, 12);
        console.log('PASS RQ: ', encryptedPassword);
        console.log('PASS DB: ', usuarios[0].password);
        //... se valido el usuario correctamente ...
        if (usuarios[0].password == encryptedPassword) { // Con Bcrypt /// Arreglar!! */
        if (usuarios[0].password == reqUsuario.password) {
          console.log("User 0: ", usuarios[0]);
          let token = auth.generateToken(usuarios[0]);
          let refreshToken = auth.generateRefreshToken(usuarios[0]);
          console.log("token: " + token);
          console.log("refreshToken: " + refreshToken);
          res.json({
            token,
            refreshToken,
            user: {
              id_persona: usuarios[0].id_persona,
              email: usuarios[0].email,
              rol: usuarios[0].rol,
            },
          });
        } else {
          res.status(403).json({ error: "Acceso no autorizado" });
        }
      } else res.status(403).json({ error: "Acceso no autorizado" });
    });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Bloquear usuario
export const blockUser = async (req, res) => {
  const { id } = req.params;
  console.log("Block id: ", id);
  if (!id) {
    return res.status(400).json({ error: "No hay id en la URL" });
  }
  try {
    const updatedUser = await usersService.updateUserById(id, {
      blocked: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Devolver datos actualizados del usuario
    res.status(200).json({ message: "Usuario blockeado" });
  } catch (error) {
    console.error("Error al bloquear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Desbloquear usuario
export const unblockUser = async (req, res) => {
  const { id } = req.params;
  console.log("Block id: ", id);
  if (!id) {
    return res.status(400).json({ error: "No hay id en la URL" });
  }
  try {
    const updatedUser = await usersService.updateUserById(id, {
      blocked: false,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Devolver datos actualizados del usuario
    res.status(200).json({ message: "Usuario des-blockeado" });
  } catch (error) {
    console.error("Error al desbloquear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
