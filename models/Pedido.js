module.exports = (sequelize, type)=>{
	  return sequelize.define('pedidos', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	total: type.INTEGER,
	  	fecha: {
	  		type: type.DATE, 
	  		defaultValue: type.NOW
	  	}
	  });
}