import { Router } from "express";
import ProductsManager from "../controllers/ProductsManager.js";

// const products = [];
const productsRouter = Router();
const productsManager = new ProductsManager();


productsRouter.get('/', async (req, res) => {
    let products = await productsManager.readProducts()
    const limit = (+req.query.limit);
    if(limit)
    {
        products = products.slice(0, limit);
    }
    
    res.status(200).send(products);
});

productsRouter.get('/:pid', async (req, res) => {
    const prodId = +req.params.pid;
    await productsManager.loadData();
    const product = await productsManager.getProductById(prodId);
    res.status(200).send(product);
});

productsRouter.post('/', async (req,res) =>{
    const product = req.body;
    console.log(product);


    await productsManager.loadData();
    await productsManager.addProduct(product);

    res.status(200).send({status: "success", message: "Added product"})

    
})

productsRouter.put('/:pid', async (req,res) => {
    const prodId = +req.params.pid;
    const modified = req.body;
    const { campo , mod } = modified;
    await productsManager.loadData();
    await productsManager.updateProductById(prodId, campo, mod);

    res.status(200).send({status: "success", message: "Modified product"})
})

productsRouter.delete('/:pid', async (req,res) =>{
    const prodId = +req.params.pid;
    await productsManager.loadData();
    await productsManager.deleteProductById(prodId);
    res.status(200).send({status: "success", message: "deleted product"})

})


export default productsRouter;

