import { promises as fs } from 'fs';



class CartsManager 
{


    constructor()
    {
        this.id = 1;
        this.carts = [];
        this.fileNameCart = '../src/DB/carts.json';
    }

    async loadCartData()
    {
        this.carts = await this.readCarts();
        // console.log(this.carts);
    }

    async addCart(cartId, productId)
    {
        this.carts = await this.readCarts();
        const findCartId =  this.carts.find(cart => cart.id == cartId);
        const j = this.carts.indexOf(findCartId);
        if(!findCartId)
        {
            const ProductToAdd = {
                "id": cartId,
                "products": [{
                    "product": productId,
                    "quantity": 1
                    
                }]
            }
            this.carts.push(ProductToAdd);
            await fs.writeFile(this.fileNameCart, JSON.stringify(this.carts));
            return
        }else{
            const { products } = findCartId;
            const prod = products.find(prod => prod.product == productId);
            if (prod){
                const i = products.indexOf(prod);
                prod.quantity++;
                products[i]= prod;
            }else{
                products.push({"product": productId, "quantity": 1});
            }
        this.carts[j] = findCartId;     
        }
        await fs.writeFile(this.fileNameCart, JSON.stringify(this.carts));

        
    }

    async readCarts()
    {
        try
        {
            const carts = await fs.readFile(this.fileNameCart, { encoding: 'utf-8' });
            return JSON.parse(carts)
        }
        catch (error)
        {
            console.log(`El archivo ${this.fileNameCart} no existe, creando...`);
            this.carts = [
                {
                    "id": 1,
                    "products": []
                    
                }
            ]
            await fs.writeFile(this.fileNameCart, JSON.stringify(this.carts));
            return [];
        }
    }

}

// const cartsManager = new CartsManager;
// await cartsManager.addCart(7, 3);
// await cartsManager.loadCartData();


export default CartsManager

