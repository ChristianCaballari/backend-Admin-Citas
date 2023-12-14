const { response } = require("express");
const {
  verifyEmailQuery,
  registerUserQuery,
  getUserByIdQuery,
  updateUserQuery,
  deleteUserQuery,
  getUserPaginadoQuery,
  getTotalUsersQuery,
  getAllAppointmentQuery
} = require("../queries/userQueries");
const { globalServices } = require("../services/globalServices");
const UserRegister = require("../models/UserRegister");
const User = require("../models/User");

const { generateJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");


const getUsuarios = async(req, res) => {
  
  const desde = Number(req.query.desde)||0;
  const paginado = Number(req.params.paginado);

  const users = await globalServices(getUserPaginadoQuery(desde,paginado));

  const total = await globalServices(getTotalUsersQuery());

  res.json({
    ok:true,
    usuarios:users.recordset,
    total: total.recordset[0].Total
  });
}

const createUser = async (req, res = response) => {
  const { name, password, email } = req.body;

  try {
    const emailExists = await globalServices(verifyEmailQuery(email));

    if (emailExists.recordset.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }
    //Encriptar password
    const salt = bcrypt.genSaltSync();

    const user = new UserRegister(name, email, bcrypt.hashSync(password, salt));

    //Guardar Usuario
    const userDB = await globalServices(registerUserQuery(user));

    //Generar el TOKEN jwt
    const token = await generateJWT(userDB.recordset[0].id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  //TODO: Validar token y comprobar si es el usuario correcto
  const id = req.params.id;

  console.log('Hola vamos de una vezz');

  try {
    const usuarioDB = await globalServices(getUserByIdQuery(id));

    if (usuarioDB.recordset.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    //Actualizaciones

    const { name, email, role } = req.body;

    if (usuarioDB.recordset[0].email !== email) {
      const emailExists = await globalServices(verifyEmailQuery(email));
      if (emailExists.recordset.length > 0) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    const user = new User(id, name, email,role);

    await globalServices(updateUserQuery(user));
    res.json({
      ok: true,
      usuario: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const borrarUsuario = async (req, res = response) => {
  const id = req.params.id;

  try {
    const usuarioDB = await globalServices(getUserByIdQuery(id));

    if (usuarioDB.recordset.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    await globalServices(deleteUserQuery(id));

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCitasByUser = async(req, res) => {


  const id = req.params.id;
  
  const citas = await globalServices(getAllAppointmentQuery(id));

  res.json({
    ok:true,
    citas:citas.recordset,
  });
}

module.exports = {
  createUser,
  actualizarUsuario,
  borrarUsuario,
  getUsuarios,
  getCitasByUser
};
