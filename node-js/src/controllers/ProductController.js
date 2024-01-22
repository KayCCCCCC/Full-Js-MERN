const ProductService = require('../services/ProductService')

class ProductController {
    static async createProduct(req, res) {
        try {
            const { name, image, type, countInStock, price, rating, description, discount } = req.body
            if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }
            const response = await ProductService.createProduct(req.body)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async updateProduct(req, res) {
        try {
            const productId = req.params.id
            const data = req.body
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.updateProduct(productId, data)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getDetailsProduct(req, res) {
        try {
            const productId = req.params.id
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.getDetailsProduct(productId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = req.params.id
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.deleteProduct(productId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async deleteManyProduct(req, res) {
        try {
            const ids = req.body.ids
            if (!ids) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The ids is required'
                })
            }
            const response = await ProductService.deleteManyProduct(ids)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getAllProduct(req, res) {
        try {
            const { limit, page, sort, filter } = req.query
            const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getAllType(req, res) {
        try {
            const response = await ProductService.getAllType()
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }
}

exports.ProductController = ProductController