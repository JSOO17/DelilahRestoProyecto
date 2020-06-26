const router = require('express').Router();


//model
const { Producto } = require('../../db');

//traer el middleware
const { checkRol } = require('../../middleware');


//routes

//read
router.get('/', async (req, res)=>{
	const productos = await Producto.findAll();
	if (productos) {
		res.json(productos);
	}else{
		res.status(400).send({ error: 'No hay productos'});
	}
	
});



router.get('/:idProducto', async (req, res)=>{
	const producto = await Producto.findOne({
		where: {
			id: req.params.idProducto
		}
	});
	if (producto) {
		res.json(producto);
	}else{
		res.status(400).send({ error: 'EL id espicificado no existe'});
	}
});


//create
router.post('/', checkRol, async(req, res)=>{
	const productos = await Producto.create(req.body);
	res.json(productos);
});


//update
router.put('/:idProducto', checkRol, async (req, res)=>{
	const producto = await Producto.findOne({
		where: {
			id: req.params.idProducto
		}
	});
	if (producto) {
		await Producto.update(req.body, {
			where: {
				id: req.params.idProducto
			}
		});
		res.json({success: 'Se ha modificado'});
	} else {
		res.status(400).send({ error: 'El producto espicificado no existe'});
	}
	
	
});

//delete
router.delete('/:idProducto', checkRol, async (req, res)=>{
	const producto = await Producto.findOne({
		where: {
			id: req.params.idProducto
		}
	});
	if (producto) {
		await Producto.destroy({
			where: {
				id: req.params.idProducto
			}
		});
		res.json({success: 'Se ha eliminado'});
	} else {
		res.status(400).send({ error: 'El producto espicificado no existe'});
	}
	
});

module.exports = router; 