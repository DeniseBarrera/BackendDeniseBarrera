const ERROR = { error: "producto no entrontrado" };

class Container {
    constructor() {
        this.products = [];
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
        const foundObj = this.products.find((product) => product.id === id);
        this.products.splice(foundObj, 1); 
    }
    
}

module.exports = Container;