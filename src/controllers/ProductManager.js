import {promises as fs, write} from 'fs'
import {nanoid} from "nanoid"

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () =>{
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products);  
    }


    writeProducts = async (product) => {
        await fs.writeFile(this.path,JSON.stringify(product))
    }

    exist = async (id) =>{
        let products = await this.readProducts();
        return products.find(prod => prod.id === id)
    }

    // Metodo para agregar productos al products.json
    addProducts = async (product) =>{
        let productsOld = await this.readProducts();
        product.id = nanoid()
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto Agregado";
    };

    getProducts = async () =>{
        return await this.readProducts()
        
    }
    getProductsById = async (id) =>{
    let productById = await this.exist(id)
    if(!productById) return "Producto no encontrado"
    return productById
    };

    

    updateProducts = async (id, product) => {
        let productById = await this.exist(id);
        if(!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let products = [{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto Actualizado"

        
    }
    
    
    
    deleteProducts = async (id) =>{
    let products =  await this.readProducts();
    let existProducts = products.some(prod => prod.id === id) 
    if (existProducts) {
    let filterProducts = products.filter(prod => prod.id === id)
    await this.writeProducts(filterProducts)
    return "Producto Eliminado"
    }
    return "Producto a eliminar inexistente"

}
};





export default ProductManager



