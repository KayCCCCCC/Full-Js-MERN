const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService')
class UserController {
    static async createUser(req, res) {
        try {
            const { name, email, password, confirmpassword, phone } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password || !confirmpassword) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            } else if (!isCheckEmail) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is email'
                })
            } else if (password !== confirmpassword) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The password is equal confirmPassword'
                })
            }
            const response = await UserService.createUser(req.body)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            } else if (!isCheckEmail) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is email'
                })
            }
            const response = await UserService.loginUser(req.body)
            const { refresh_token, ...newReponse } = response
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
            })
            // return res.status(200).json({ ...newReponse, refresh_token })
            return res.status(200).json({ ...newReponse })
        } catch (e) {
            return res.status(500).json({
                message: e
            })
        }
    }
    static async updateUser(req, res) {
        try {
            const userId = req.params.id
            const data = req.body
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.updateUser(userId, data)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.deleteUser(userId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async deleteMany(req, res) {
        try {
            const ids = req.body.ids
            if (!ids) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The ids is required'
                })
            }
            const response = await UserService.deleteManyUser(ids)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }


    static async getAllUser(req, res) {
        try {
            const response = await UserService.getAllUser()
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async getDetailsUser(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.getDetailsUser(userId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

    static async refreshToken(req, res) {
        try {
            // console.log('Cookies: ', req.cookies)
            const token = req.cookies.refresh_token
            // console.log('>>> check rfToken: ', token)
            if (!token) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The token is required'
                })
            }
            const response = await JwtService.refreshTokenJwtService(token)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }


    static async logoutUser(req, res) {
        try {
            await res.clearCookie("refresh_token", {
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
            });
            const token = req.cookies
            console.log('token', token)
            return res.status(200).send({ msg: "Logged out" });
        } catch (error) {
            console.error("Logout error:", error);
            return res.status(500).send({ msg: "Logout error" });
        }
    }

}
exports.UserController = UserController