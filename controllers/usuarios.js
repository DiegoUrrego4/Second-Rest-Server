const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No Name', apikey } = req.query;
  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API - Controlador',
    id,
  });
};

const usuariosPost = async (req, res = response) => {
  

  // Pequeña validación del body
  const { nombre, correo, contraseña, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, contraseña, rol });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo ${correo} ha sido registrado previamente.`,
    });
  }
  /*
  Encriptar la contraseña
  Este es el nivel de encriptación que vamos a usar, por defecto viene en 10 genSaltSync(10)
  Puede ser tan dificil de descifrar como queramos pero el tiempo también será mayor.
  */
  const salt = bcryptjs.genSaltSync();
  usuario.contraseña = bcryptjs.hashSync(contraseña, salt);
  // Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador',
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - Controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
