import { axiosJWT } from "./UserService"
import { getAllOrder, getAllOrderDetails, createOrder, getDetailsOrder, cancelOrder } from '../utils/apiRoutes'

export const CreateOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${createOrder}/${data.user}`, data, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const GetOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${getAllOrderDetails}/${id}`, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const GetDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${getDetailsOrder}/${id}`, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const CancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${cancelOrder}/${userId}`, data, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const GetAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${getAllOrder}`, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}