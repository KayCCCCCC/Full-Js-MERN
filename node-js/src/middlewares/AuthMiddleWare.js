const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization
    console.log('>>> check token: ', token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

// const authUserMiddleWare = (req, res, next) => {
//     const token = req.headers.authorization
//     console.log('>>> check token: ', token)
//     const userId = req.params.id
//     jwt.verify(token, process.env.ACCESS_TOKEN, { ignoreExpiration: true }, function (err, user) {
//         console.log('>>> check user: ', user)
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         if (user?.isAdmin || user?._id === userId) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.authorization
    console.log('token cancel: ', token)
    const userId = req.params.id
    console.log('userId: ', userId)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}