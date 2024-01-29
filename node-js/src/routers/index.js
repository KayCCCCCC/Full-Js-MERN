const userRoutes = require('./UserRouters')
const productRoutes = require('./ProductRouters')
const orderRoutes = require('./OrderRouters')
const paymentRoutes = require('./PaymentRouters')
const cors = require('cors');
const routes = (app) => {
    app.use('/api/user', userRoutes, cors())
    app.use('/api/order', orderRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/payment', paymentRoutes)
}
module.exports = routes