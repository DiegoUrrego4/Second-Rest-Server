const Rol = require('../models/role');

const esRoleValido = async (rol = '') => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} NO está registrado en BD.`);
  }
};

module.exports = {
  esRoleValido,
};
