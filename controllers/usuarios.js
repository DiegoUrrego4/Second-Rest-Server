const { response, request } = require('express');

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

const usuariosPost = (req, res = response) => {
  // Pequeña validación del body
  const { nombre, edad } = req.body;
  res.json({
    msg: 'post API - Controlador',
    nombre,
    edad,
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
