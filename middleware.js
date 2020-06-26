const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

	if(!req.headers['user-token']){
		return res.status(401).send({ error: 'Necesitas incluir user-token en los headers'});
	}

	const userToken =  req.headers['user-token'];
	let payload = {};

	try{
		payload = jwt.decode(userToken, 'frase secreta');
	}catch(error){
		return res.status(403).send({ error: 'el token es incorrecto'});	
	}

	req.roleId = payload.roleId;

	req.userId = payload.usuarioId;


	next();
}



const checkRol = (req, res, next) => {
	
	if (req.roleId != 1) {
		return res.status(401).send({ error: 'No estas autorizado'});
	}
	next();

}


module.exports = {
	checkToken,
	checkRol
}