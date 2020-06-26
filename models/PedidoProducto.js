//const PedidoModel = require('./Pedido');
//const ProductoModel = require('./productos');

const { Pedido, Producto } =  require('../db.js');

module.exports = (sequelize, type)=>{
  return sequelize.define('pedidoProducto', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
  });
}
