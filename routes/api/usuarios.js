const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const { Op, QueryTypes, Sequelize} = require('sequelize');

//traer el middleware
const { checkRol, checkToken } = require('../../middleware');


router.get('/', [checkToken, checkRol], async (req, res)=>{
	const usuarios = await Usuario.findAll();
	res.json(usuarios);
});

router.get('/perfil', checkToken, async (req, res)=>{
	const usuario = await Usuario.findOne({
		where: {
			id: req.roleId
		}
	});
	res.json(usuario);
});


//registro
router.post('/register', [
		check('usuario', 'el nombre de usuario es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatorio').not().isEmpty(),
		check('correo', 'el email debe ser válido').isEmail()
	], async (req, res)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			errores: errors.array()
		})
	} else {
		req.body.password = bcrypt.hashSync(req.body.password, 10);
		const usuario = await Usuario.create(req.body);
		res.json(usuario);
	}
	
});

//login

router.post('/login', async (req, res)=>{
	const usuario = await Usuario.findOne({
		where: {
			[Op.or]: [
      			{ correo: req.body.correo },
      			{ usuario: req.body.usuario }
    		]
		}
	});
	console.log(usuario);
	if (usuario) {
		const iguales = bcrypt.compareSync(req.body.password, usuario.password);
		if (iguales) {
			res.json({ sucess: createToken(usuario)})
		}else{
			res.json({ error: "Correo o contraseña incorrecta"})	
		}

	}else{
		console.log('entro aqui');
		res.json({ error: "Correo o contraseña incorrecta"})
	}
});


//crear el token
const createToken = (user) => {
	const payload = {
		usuarioId: user.id,
		roleId: user.roleId
	}

	return jwt.encode(payload, 'frase secreta');
}
	


module.exports = router;