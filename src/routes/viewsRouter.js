import { Router } from 'express';
import CartsManager from '../controllers/CartsManager.js';
import ProductsManager from '../controllers/ProductsManager.js';
import { carrito } from '../Carrito.js' 
// import { Server } from 'socket.io';

const viewsRouter = Router();
const cartsManager = new CartsManager;
const productsManager = new ProductsManager;

viewsRouter.get('/cart/:cid', async (req,res) => {
    const cartId = +req.params.cid;
    let renderProducts = [];
    let carts = await cartsManager.readCarts();
    const findCart =  carts.find(cart => cart.id == cartId);
    if(findCart){
        const { id, products} = findCart
        const listProducts = await productsManager.readProducts();
        products.forEach(product => {
        const findId = listProducts.find(object => object.id === product.product);
        const renderProduct = {
            name: findId.name,
            price: findId.price,
            quantity: product.quantity
        }
        renderProducts.push(renderProduct);
    });
    }


    res.render('products', {name: 'usuario', title: 'Products in cart', renderProducts, id: cartId})

});

viewsRouter.get('/realTimeProducts', (req,res) => {
    console.log("aqui");
    console.log(+carrito.numero +1);
    res.render('realTimeProducts', {name: 'Cliente', title: 'my first page'});
    


});

viewsRouter.get('/', (req,res) => {
    res.render('greetings', {name: 'Cliente', title: 'my first page'});
  
    

});

        

export default viewsRouter;