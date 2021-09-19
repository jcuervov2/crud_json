const { render } = require('ejs');
const jsonTable = require('../database/jsonTable');
let productsModel = jsonTable('productsDataBase');

const controller = {
    // Root - Show all products
    index: (req, res) => {
        const products = productsModel.readFile();
        res.render('products', { products });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        let product = productsModel.find(req.params.id);
        res.render('detail', { product });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form');
    },

    // Create -  Method to store
    store: (req, res) => {
        let id = productsModel.create(req.body);

        res.redirect('/products/detail/' + id)
    },

    // Update - Form to edit
    edit: (req, res) => {
        let product = productsModel.find(req.params.id);
        res.render('product-edit-form', { productToEdit: product });
    },
    // Update - Method to update
    update: (req, res) => {

        productsModel.update(req.body, req.params.id);
        res.redirect('/products/detail/' + req.params.id)
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        productsModel.delete(req.params.id);
        res.redirect('/')
    }
};

module.exports = controller;