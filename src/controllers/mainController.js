const jsonTable = require('../database/jsonTable');
let productsModel = jsonTable('productsDataBase');


const controller = {
    index: (req, res) => {
        const products = productsModel.readFile();
        let productsVisited = products.filter(product => product.category === 'visited')
        let productsInSale = products.filter(product => product.category === 'in-sale')


        res.render('index', {
            productsVisited,
            productsInSale,
        })
    },
    search: (req, res) => {
        // Do the magic
    },
};

module.exports = controller;