import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import { engine } from 'express-handlebars'
import { resolve } from 'path'
import viewsRouter from './routes/viewsRouter.js';
import { Server } from 'socket.io';
import { carrito } from './Carrito.js' 

const PORT = 8083;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const viewsPath = resolve('src/views');

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/home.handlebars`,

}));



app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
// app.use('/carts', viewsRouter);
// app.use('/realTimeProducts', viewsRouter);
app.use('/', viewsRouter);
app.use('/realTimeProducts', viewsRouter);
app.use('/cart', viewsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Conectado al server en el puerto: ${PORT}`);
  });

  const socketServer = new Server(httpServer);


  socketServer.on('connection', socket =>
        {
            console.log('Nuevo cliente conectado');

            socket.on('cart', (data) =>
          {
            // localStorage.setItem('data', 'valor');
            // console.log(data);         
            carrito.numero = data;
            // console.log(carrito);
            // socket.broadcast.emit('chatRoom1', data);
          });

        //     socket.on('message', (data) => {
        //     console.log('perro');
          
        // });

        // socket.emit('evento_para_socket_individual', 'Este mensaje solo lo debe recibir el socket');

        // socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'Este evento lo veran todos los sockets conectados, MENOS el socket actual desde el que se envio el mensaje');

        // socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados.');

        // socket.on('chatRoom1', (data) =>
        //     {
        //         console.log(data);

        //         socket.broadcast.emit('chatRoom1', data);
        //     });
        });




// const productoPrueba1 = {
//     name: "Producto 1",
//     description: "Desc1",
//     price: 2000,
//     thumbnail: "Sin Imagen",
//     code: "abc123",
//     stock: 25,
//     status: 1,
//     category: "cat1"
// }

// const productoPrueba2 = {
//     name: "Producto 2",
//     description: "Desc2",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "123abc",
//     stock: 12,
//     status: 1,
//     category: "cat2"
// }
// const productoPrueba3 = {
//     name: "Producto 3",
//     description: "Desc3",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "a123bc",
//     stock: 10,
//     status: 1,
//     category: "cat3"
// }
// const productoPrueba4 = {
//     name: "Producto 4",
//     description: "Desc4",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "ab123c",
//     stock: 16,
//     status: 1,
//     category: "cat4"
// }
// const productoPrueba5 = {
//     name: "Producto 5",
//     description: "Desc5",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "1a23bc",
//     stock: 47,
//     status: 1,
//     category: "cat5"
// }
// const productoPrueba6 = {
//     name: "Producto 6",
//     description: "Desc6",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "1ab23c",
//     stock: 52,
//     status: 1,
//     category: "cat6"
// }
// const productoPrueba7 = {
//     name: "Producto 7",
//     description: "Desc7",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "1abc23",
//     stock: 66,
//     status: 1,
//     category: "cat7"
// }
// const productoPrueba8 = {
//     name: "Producto 8",
//     description: "Desc8",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "12a3bc",
//     stock: 77,
//     status: 1,
//     category: "cat8"
// }
// const productoPrueba9 = {
//     name: "Producto 9",
//     description: "Desc9",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "12ab3c",
//     stock: 12,
//     status: 1,
//     category: "cat9"
// }

