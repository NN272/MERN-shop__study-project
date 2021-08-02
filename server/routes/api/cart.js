const User = require('../../models/User');
const Product = require('../../models/Product');

module.exports = (app) => {
    
    app.post('/cart/addToCart', (req, res, next) => {
        const {body} = req;

        const {
            token,
            productTitle
        } = body;

        Product.find({
            title: productTitle
        }, (err, products) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server Error'
                });
            }

            const product = products[0];

            User.find({
                _id: token
            }, (err, users) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Server Error'
                    });
                }
    
                const user = users[0];
    
                user.cart.push(product);
    
                user.save((err, doc) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: 'Server error'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'Valid cart',
                    });
                });
            });
        });
    });

    app.get('/cart/getAll', (req, res, next) => {
        const {query} = req;

        const {token} = query;

        User.find({
            _id: token
        }, (err, products) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }

            const user = users[0];

            return res.send({
                products: user.cart,
                message: 'Скорее бы уже этот бэк доделать('
            });
        });
    });
}
