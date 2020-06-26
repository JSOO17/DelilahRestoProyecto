const router = require('express').Router();
const { Pedido, Producto, PedidoProducto, sequelize } = require('../../db');
const { check, validationResult } = require('express-validator');
const { Op, QueryTypes} = require('sequelize');
const PedidoProductoModel = require('../../models/PedidoProducto');


const { checkRol } = require('../../middleware');


router.get('/', async (req, res)=>{
	
	if (req.roleId==1) {
		console.log(req.roleId);
		const pedidos = await sequelize.query(
			'SELECT usuarios.usuario, usuarios.correo, pedidos.id, pedidos.estadoId, pedidos.createdAt, pedidos.estadoId, GROUP_CONCAT(pedidoproductos.productoId) AS productos, SUM(productos.precio) AS total FROM pedidos INNER JOIN usuarios ON usuarios.id = pedidos.usuarioId INNER JOIN pedidoproductos ON pedidos.id = pedidoproductos.pedidoId INNER JOIN productos ON pedidoproductos.productoId = productos.id GROUP BY pedidos.id', {
			type: sequelize.QueryTypes.SELECT
		});
		if (pedidos) {
			res.json(pedidos);
		}else{
			res.status(400).send({ error: 'Hubo un error'});
		}
	
	}else{
		const pedidos = await sequelize.query(
			'SELECT usuarios.usuario, usuarios.correo, pedidos.id, pedidos.estadoId, pedidos.createdAt, pedidos.estadoId, GROUP_CONCAT(pedidoproductos.productoId) AS productos, SUM(productos.precio) AS total FROM pedidos INNER JOIN usuarios ON usuarios.id = pedidos.usuarioId INNER JOIN pedidoproductos ON pedidos.id = pedidoproductos.pedidoId INNER JOIN productos ON pedidoproductos.productoId = productos.id WHERE usuarios.id = :id GROUP BY pedidos.id', {
			replacements: { id: req.roleId },
			type: sequelize.QueryTypes.SELECT
		});
		if (pedidos) {
			res.json(pedidos);
		}else{
			res.status(404).send({ error: 'No hay pedidos de este usuario'});
		}
		
	}
	
	
});


//create
router.post('/', async (req, res)=>{
	req.body.usuarioId = req.userId;
	const pedidos = await Pedido.create(req.body);
	const productos = req.body.productos
	await productos.forEach(element =>{
		const pedidoProducto = {
			pedidoId: pedidos.id,
			productoId: element
		}
		console.log(pedidoProducto);
		PedidoProducto.create(pedidoProducto);
	})
	res.json(pedidos);
});


//get
router.get('/:idPedido', async (req, res)=>{
	const pedido = await sequelize.query(
		'SELECT usuarios.usuario, usuarios.correo, pedidos.id, pedidos.estadoId, pedidos.createdAt, pedidos.estadoId, GROUP_CONCAT(pedidoproductos.productoId) AS productos, SUM(productos.precio) AS total FROM pedidos INNER JOIN usuarios ON usuarios.id = pedidos.usuarioId INNER JOIN pedidoproductos ON pedidos.id = pedidoproductos.pedidoId INNER JOIN productos ON pedidoproductos.productoId = productos.id WHERE pedidos.id = :id GROUP BY pedidos.id', {
		replacements: { id: req.params.idPedido },
		type: sequelize.QueryTypes.SELECT
	});
	if (pedido[0]) {
		res.json(pedido[0]);
	}else{
		res.status(400).send({ error: 'El pedido espicificado no existe'});
	}
	
	
});

//update
router.put('/:idPedido', checkRol, async (req, res)=>{
	const pedido = await Pedido.findOne({
		where: {
			id: req.params.idPedido
		}
	});
	if (pedido) {
		await Pedido.update(req.body, {
			where: {
				id: req.params.idPedido
			}
		});
		res.json({success: 'Se ha modificado'});
	}else{
		res.status(400).send({ error: 'El pedido espicificado no existe'});
	}
	
	
});

//delete
router.delete('/:idPedido', checkRol, async (req, res)=>{
	const pedido = await Pedido.findOne({
		where: {
			id: req.params.idPedido
		}
	});
	if (pedido) {
		await Pedido.destroy({
			where: {
				id: req.params.idPedido
			}
		});
		res.json({success: 'Se ha eliminado'});
	}else{
		res.status(400).send({ error: 'El pedido espicificado no existe'});
	}
});


module.exports = router;