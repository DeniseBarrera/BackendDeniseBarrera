const ERROR = { error: "producto no entrontrado" };

class ProductosApi {
    constructor() {
        this.products = [
            {producto: 'Botella motivacional', precio: 3500, foto: 'https://www.flaticon.es/icono-gratis/botella-de-plastico_2907424'},
            {producto: 'Tupper Vianda', precio: 2100, foto: './iconos/cajas.png'},
            {producto: 'Termo infantil', precio: 4000, foto: 'https://www.flaticon.es/icono-gratis/botella_3410881?term=termo&page=1&position=6&page=1&position=6&related_id=3410881&origin=search'}
        ];
    }

    create(obj) {
        const arrayOfIds = this.products.map((product) => product.id);
        const maxId = arrayOfIds.length === 0 ? 0 : Math.max(...arrayOfIds);
        const id = maxId + 1;
        const newObj = { id, ...obj };
        this.products.push(newObj);
        return newObj;
    }
    getAll() {
        return this.products;
    }

    getById(id) {
        const obj = this.products.find((product) => product.id === id);
        if (obj) {
            return obj;
        } else {
            return ERROR;
        }
    }
    updateById(id, obj) {
        const foundObj = this.products.find((product) => product.id === id);
        if (foundObj) {
            const filteredProducts = this.products.filter(
                (product) => product.id !== id
            );
            const newObj = { id, ...obj };
            this.products = [...filteredProducts, newObj];
            return newObj;
        } else {
            return ERROR;
        }
    }

    deleteById(id) {
        const foundObj = this.products.findIndex(
            (product) => product.id === id
        );
        if (foundObj) {
        this.products.splice(foundObj, 1); 
        } else {
            return ERROR;
        }
    }
    
}

module.exports = ProductosApi;