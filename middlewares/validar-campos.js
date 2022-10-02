const { validationResult } = require('express-validator');

/**
 * 
 * @param {requirement} req 
 * @param {response} res 
 * @param {next} next
 * * Esta función permite ir al siguiente middleware hasta agotarlos
 * * Una vez ya no hay más middlewares se ejecuta el controlador. 
 * @returns 
 */
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = {
  validarCampos,
};
