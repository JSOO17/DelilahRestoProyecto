module.exports = (sequelize, type)=>{
	  return sequelize.define('roles', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	nombreRol: type.STRING,
	  });

}