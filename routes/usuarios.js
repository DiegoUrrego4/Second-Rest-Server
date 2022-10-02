const { Router } = require('express');
const { check } = require('express-validator');
const Rol = require('../models/role');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

/* *
 * El middleware es una función que se usa antes de ejecutar cualquier función
 *  la forma correcta de usar es enviando un segundo argumento, por ejemplo:
 !  router.post('/', middlewareCualquiera, usuariosPost);
 ? Nota: si son varios arreglos se envían como un arreglo
 !  Estructura:  router.post(ruta, middlewaresCualquiera, controlador);
 */
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'contraseña',
      'La contraseña debe tener más de 6 caracteres'
    ).isLength(6),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async (rol = '') => {
      const existeRol = await Rol.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} NO está registrado en BD.`);
      }
    }),
    validarCampos,
  ],
  usuariosPost
);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
