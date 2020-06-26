module.exports = (sequelize, type)=>{
	  return sequelize.define('estado', {
	  	id: {
	  		type: type.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	estado: type.STRING,
	  }
	 );

}