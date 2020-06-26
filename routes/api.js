const router = require('express').Router();


//traer el middleware
const { checkToken } = require('../middleware');

//traer las rutas
const apiProductosRouter =  require('./api/productos');
const apiUsuariosRouter =  require('./api/usuarios');
const apiPedidosRouter =  require('./api/pedidos');



// enviar rutas
router.use('/productos', checkToken, apiProductosRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/pedidos', checkToken, apiPedidosRouter);




module.exports = router;