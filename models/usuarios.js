module.exports = (sequelize, type)=>{
	  return sequelize.define('usuarios', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	usuario: type.STRING(50),
	  	nombreCompleto: type.STRING(120),
	  	correo: type.STRING(100),
	  	telefono: type.STRING(11),
	  	direccion: type.STRING(200),
	  	password: type.STRING(150),
	  	roleId: type.INTEGER
	  });
}

