import { Router } from 'express';
import CartsManager from '../controllers/CartsManager.js';

// const carts = [];
const cartsRouter = Router();
const cartsManager = new CartsManager;

cartsRouter.get ('/:cid', async (req, res) => {
    const cartId = +req.params.cid;
    console.log(cartId);
    let carts = await cartsManager.readCarts();
    const findCart =  carts.find(cart => cart.id == cartId);
    console.log(findCart);
    res.status(200).json(findCart);
});

cartsRouter.post("/:cid/product/:pid", async (req,res) => {
    const cartId = +req.params.cid;
    const prodId = +req.params.pid;
    await cartsManager.loadCartData();
    await cartsManager.addCart(cartId, prodId);
    
    res.status(200).send({status: "success", Message: "Product added to cart"})

});

    
export default cartsRouter;
