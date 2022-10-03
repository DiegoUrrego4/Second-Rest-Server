const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = 'No Name', apikey } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    usuarios,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, contraseña, google, correo, ...resto } = req.body;

  // TODO: validar contra base de datos
  if (contraseña) {
    const salt = bcryptjs.genSaltSync();
    resto.contraseña = bcryptjs.hashSync(contraseña, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  // Pequeña validación del body
  const { nombre, correo, contraseña, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, contraseña, rol });

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
