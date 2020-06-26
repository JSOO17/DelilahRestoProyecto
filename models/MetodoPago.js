module.exports = (sequelize, type)=>{
	  return sequelize.define('metodoPago', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	metodoPago: type.STRING,
	  });

}