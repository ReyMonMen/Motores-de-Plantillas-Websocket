import { promises as fs } from 'fs';

class ProductsManager
{
    #products;

    constructor()
    {
        this.id = 1;
        this.#products = [];
        this.fileName = '../src/DB/products.json';
    }

    async loadData()
    {
        this.#products = await this.readProducts();
    }

    async addProduct(product)

    {
        const findCode = this.#products.find(products => products.code === product.code); 

        if(findCode)
        {
            return `El codigo de producto ${product.code} ya esta en uso`;
        
        }
        else
        {
            let idMasAlto = 0;
            this.#products.forEach(objeto => {if (objeto.id > idMasAlto) idMasAlto = objeto.id;});
            product.id = idMasAlto + 1;
            this.#products.push(product);
            await fs.writeFile(this.fileName,JSON.stringify(this.#products));
            return "Producto Agragado";

        }
        
    }

    async readProducts()
    {
        try
        {
            const products = await fs.readFile(this.fileName, { encoding: 'utf-8' });
            return JSON.parse(products);
        }
        catch (error)
        {
            // console.log(`El archivo ${this.fileName} no existe, creando...`);
            // await fs.writeFile(this.fileName, '[]');
            return [];
        }
    }

    getProductById(id)
    {

        this.loadData();

        const findId = this.#products.find(product => product.id === id);
      
        if(!findId)
        {
          return "Producto no encontrado";
        }
      
        return findId;
    }

    async deleteProductById (id)
    {

        this.loadData();      
        const findId = this.#products.find(product => product.id === id);

        if(findId)
        {
            let index = this.#products.indexOf(this.#products.find(product => product.id === id));
            this.#products.splice(index,1);
            await fs.writeFile(this.fileName,JSON.stringify(this.#products));
            return `El producto id Nro: ${id} fue eliminado.`
        }
        else 
            return `El producto id Nro: ${id} no existe.`;

    }

    async updateProductById(id, key, value)
    {
        
        this.loadData(); 

        const findId = this.#products.find(product => product.id === id);

        if(findId)
        {
            if(key in findId){
                let index = this.#products.indexOf(this.#products.find(product => product.id === id));
                this.#products[index][key]= value;
                await fs.writeFile(this.fileName,JSON.stringify(this.#products));
                return 'campo modificado con exito'     
            }
            else
                return 'key not found';   
        }
        else
            return `El producto id Nro: ${id} no existe.`;
            
    }
};


// const main = async () =>
// {
//   try
//   {
//     const productsManager = new ProductsManager();

//     await productsManager.loadData();

//     const resProd1 = await productsManager.addProduct(productoPrueba1);
//     console.log(resProd1);

//     const resProd2 = await productsManager.addProduct(productoPrueba2);
//     console.log(resProd2);

//     const resProdMod = await productsManager.updateProductById(2, 'description', 'cambio de descripcion4');
//     console.log(resProdMod);

//     const resId = productsManager.getProductById(2);
//     console.log(resId);

//     // const resDelProdId = await productsManager.deleteProductById(1);
//     // console.log(resDelProdId);

//     // const products = await productsManager.readProducts();
//     // console.log(products);

//   }
//   catch (e)
//   {
//     console.log(e);
//   }
// }

// main();

// const productoPrueba1 = {
//     name: "Producto de prueba",
//     description: "No sirve para un carajo",
//     price: 2000,
//     thumbnail: "Sin Imagen",
//     code: "abc123",
//     stock: 25
// }

// const productoPrueba2 = {
//     name: "Producto de prueba2",
//     description: "No sirve para un jocara",
//     price: 500,
//     thumbnail: "Sin Imagen",
//     code: "123abc",
//     stock: 12
// }

export default ProductsManager