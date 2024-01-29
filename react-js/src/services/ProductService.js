import axios from "axios"
import { axiosJWT } from "./UserService"
import { getAllProduct, getProductType, getDetailsProduct, createProduct, updateProduct, deleteProduct, deleteManyProduct, getAllTypeProduct } from "../utils/apiRoutes"
export const GetAllProduct = async (search, limit, page) => {
    console.log('>>> check page', page)
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${getAllProduct}?filter=name&filter=${search}&limit=${limit}&page=${page}`)
    } else {
        res = await axios.get(`${getAllProduct}?limit=${limit}&page=${page}`)
    }
    return res.data
}

export const GetProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${getProductType}?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const CreateProduct = async (data) => {
    const res = await axios.post(`${createProduct}`, data)
    return res.data
}

export const GetDetailsProduct = async (id) => {
    const res = await axios.get(`${getDetailsProduct}/${id}`)
    console.log('res: ', res)
    return res.data
}

export const UpdateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${updateProduct}/${id}`, data, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    console.log('check service: ', res)
    return res.data
}

export const DeleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${deleteProduct}/${id}`, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const DeleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${deleteManyProduct}`, data, {
        headers: {
            authorization: `${access_token}`,
        }
    })
    return res.data
}

export const GetAllTypeProduct = async () => {
    const res = await axios.get(`${getAllTypeProduct}`)
    return res.data
}