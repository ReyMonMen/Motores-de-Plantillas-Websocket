import express from 'express';
import ProductsManager from './controllers/ProductsManager.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import CartsManager from './controllers/CartsManager.js';
// import { Router } from 'express';

const productsManager = new ProductsManager;
const cartsManager = new CartsManager;
const PORT = 8083;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// app.get('/api/products', async (req, res) => {
//     let products = await productsManager.readProducts()
//     const limit = (+req.query.limit);
//     if(limit)
//     {
//         products = products.slice(0, limit);
//     }
    
//     res.send(products);
// });

// app.get('/products/:pid', async (req, res) => {
//     const product = await productsManager.getProductById(+req.params.pid);
//     res.send(product);
// });


const main = async () =>
{
  try
  {
    
    // const productsManager = new ProductsManager();

    await productsManager.loadData();

    await productsManager.addProduct(productoPrueba1);
    await productsManager.addProduct(productoPrueba2);
    await productsManager.addProduct(productoPrueba3);
    await productsManager.addProduct(productoPrueba4);
    await productsManager.addProduct(productoPrueba5);
    await productsManager.addProduct(productoPrueba6);
    await productsManager.addProduct(productoPrueba7);
    await productsManager.addProduct(productoPrueba8);
    await productsManager.addProduct(productoPrueba9);
   

    // const resProdMod = await productsManager.updateProductById(2, 'description', 'Desc 2 Cambio');
    // console.log(resProdMod);

    // const resId = productsManager.getProductById(2);
    // console.log(resId);
    

    // const resDelProdId = await productsManager.deleteProductById(1);
    // console.log(resDelProdId);

    // const products = await productsManager.readProducts();
    // console.log(products);

  }
  catch (e)
  {
    console.log(e);
  }
}

// main ();


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});







const productoPrueba1 = {
    name: "Producto 1",
    description: "Desc1",
    price: 2000,
    thumbnail: "Sin Imagen",
    code: "abc123",
    stock: 25,
    status: 1,
    category: "cat1"
}

const productoPrueba2 = {
    name: "Producto 2",
    description: "Desc2",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "123abc",
    stock: 12,
    status: 1,
    category: "cat2"
}
const productoPrueba3 = {
    name: "Producto 3",
    description: "Desc3",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "a123bc",
    stock: 10,
    status: 1,
    category: "cat3"
}
const productoPrueba4 = {
    name: "Producto 4",
    description: "Desc4",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "ab123c",
    stock: 16,
    status: 1,
    category: "cat4"
}
const productoPrueba5 = {
    name: "Producto 5",
    description: "Desc5",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "1a23bc",
    stock: 47,
    status: 1,
    category: "cat5"
}
const productoPrueba6 = {
    name: "Producto 6",
    description: "Desc6",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "1ab23c",
    stock: 52,
    status: 1,
    category: "cat6"
}
const productoPrueba7 = {
    name: "Producto 7",
    description: "Desc7",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "1abc23",
    stock: 66,
    status: 1,
    category: "cat7"
}
const productoPrueba8 = {
    name: "Producto 8",
    description: "Desc8",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "12a3bc",
    stock: 77,
    status: 1,
    category: "cat8"
}
const productoPrueba9 = {
    name: "Producto 9",
    description: "Desc9",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "12ab3c",
    stock: 12,
    status: 1,
    category: "cat9"
}

