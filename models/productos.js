module.exports = (sequelize, type)=>{
	  return sequelize.define('producto', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	nombreProducto: type.STRING,
	  	precio: type.INTEGER
	  });
}