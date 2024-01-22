const OrderService = require('../services/OrderService')

class OrderController {
    static async createOrder(req, res) {
        try {
            const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
            if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }
            const response = await OrderService.createOrder(req.body)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getAllOrderDetails(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await OrderService.getAllOrderDetails(userId)
            return res.status(200).json(response)
        } catch (e) {
            // console.log(e)
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getDetailsOrder(req, res) {
        try {
            const orderId = req.params.id
            if (!orderId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await OrderService.getOrderDetails(orderId)
            return res.status(200).json(response)
        } catch (e) {
            // console.log(e)
            return res.status(404).json({
                message: e
            })
        }
    }

    static async cancelOrderDetails(req, res) {
        try {
            const data = req.body.orderItems
            const orderId = req.body.orderId
            if (!orderId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The orderId is required'
                })
            }
            const response = await OrderService.cancelOrderDetails(orderId, data)
            return res.status(200).json(response)
        } catch (e) {
            // console.log(e)
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getAllOrder(req, res) {
        try {
            const data = await OrderService.getAllOrder()
            return res.status(200).json(data)
        } catch (e) {
            // console.log(e)
            return res.status(404).json({
                message: e
            })
        }
    }
}

exports.OrderController = OrderController