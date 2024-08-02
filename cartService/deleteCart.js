

const cartModel = require('../models/CartModel');

const deleteCart = async (userId, productId) => {
    try {
        console.log(productId)
        const user = await cartModel.findOne({ userId });
        if (!user) {
            console.error('User not found with userId:', userId);
            throw new Error('User not found');
        }

        if (!user.product) {
            console.error('Product field not found in user cart:', user);
            throw new Error('Product field is undefined');
        }

        user.product = user.product.filter(item => item.productId != productId);
        await user.save(); 

        return user.product; 
    } catch (err) {
        console.error('Error in deleteCart:', err);
        throw err; 
    }
};

module.exports = { deleteCart };
