const Sequelize =  require('sequelize');


//traer modelos
const ProductoModel = require('./models/productos');
const UsuarioModel = require('./models/usuarios');
const RolModel = require('./models/roles');
const EstadoModel = require('./models/Estado');
const MetodoPagoModel = require('./models/MetodoPago');
const PedidoModel = require('./models/Pedido');
const PedidoProductoModel = require('./models/PedidoProducto');



//conexion
const sequelize = new Sequelize('mysql://root@localhost:3306/delilah');

//definir modelos
const Producto = ProductoModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);
const Rol = RolModel(sequelize, Sequelize);
const Estado = EstadoModel(sequelize, Sequelize);
const MetodoPago = MetodoPagoModel(sequelize, Sequelize);
const Pedido = PedidoModel(sequelize, Sequelize);
const PedidoProducto = PedidoProductoModel(sequelize, Sequelize);




//relaciones:3

//usuario-rol
Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

//pedido-usuario
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);

//pedido-estado
Estado.hasMany(Pedido);
Pedido.belongsTo(Estado);

//pedido-metodoPago
MetodoPago.hasMany(Pedido);
Pedido.belongsTo(MetodoPago);

Pedido.hasMany(PedidoProducto);
PedidoProducto.belongsTo(Pedido);

Producto.hasMany(PedidoProducto);
PedidoProducto.belongsTo(Producto);



sequelize.sync({force: false})
.then(()=>{
	console.log('tabla creadas');
})




module.exports = {
	Producto,
	Rol,
	Usuario,
	Estado,
	MetodoPago, 
	Pedido,
	PedidoProducto,
	sequelize
}