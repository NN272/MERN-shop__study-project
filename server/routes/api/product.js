const Product = require('../../models/Product');

module.exports = (app) => {
    app.post('/product/create', (req, res, next) => {
        const {body} = req;
        const {
            title,
            category,
            description,
            price,
            image
        } = body;

        if(!title) {
            return res.send({
                success: false,
                message: 'Error: Title cannot be blank'
            });
        }
        if(!category) {
            return res.send({
                success: false,
                message: 'Error: Category cannot be blank'
            });
        }
        if(!description) {
            return res.send({
                success: false,
                message: 'Error: Description cannot be blank'
            });
        }
        if(!price) {
            return res.send({
                success: false,
                message: 'Error: Price cannot be blank'
            });
        }
        if(!image) {
            return res.send({
                success: false,
                message: 'Error: Image cannot be blank'
            });
        }

        const newProduct = new Product();

        newProduct.title = title;
        newProduct.category = category;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.image = image;

        newProduct.save((err, product) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Success: Product has been succesfully created'
            });
        });
    });


    app.get('/product/getAll', (req, res, next) => {
        Product.find({}, (err, products) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.send({
                message: products
            });
        });
    });
	

    app.get('/product/findproduct', (req, res, next) => {
        const {query} = req;
        const id = query;
        Product.find({
            _id: id.id
        }, (err, products) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }
            if(products.length != 1) {
                return res.send({
                    success: false,
                    message: 'Invalid'
                });
            }

            const product = products[0];

            return res.send({
                success: true,
                message: product
            });
        });
    });
}
