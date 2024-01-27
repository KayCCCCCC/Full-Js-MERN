import axios from "axios"
import { loginUser, signupUser, getDetailsUser, deleteUser, getAllUser, refreshToken, logoutUser, updateUser, deleteManyUser } from "../utils/apiRoutes"

export const axiosJWT = axios.create()

export const LoginUser = async (data) => {
    const res = await axios.post(`${loginUser}`, data, { withCredentials: true })
    return res.data
}

export const SignupUser = async (data) => {
    const res = await axios.post(`${signupUser}`, data, { withCredentials: true })
    console.log('check data: ', data)
    return res.data
}

export const GetDetailsUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(`${getDetailsUser}/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `${access_token}`
            }
        });

        return res.data;
    } catch (error) {
        // Handle errors
        console.error('Error in GetDetailsUser:', error);
        throw error;
    }
};


export const DeleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(`${deleteUser}/${id}`, {
        withCredentials: true,
        headers: {
            'Authorization': `${access_token}`
        }
    },)
    return res.data
}

export const GetAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${getAllUser}`, {
        withCredentials: true,
        headers: {
            'Authorization': `${access_token}`
        }
    },)
    return res.data
}

export const RefreshToken = async () => {
    const res = await axios.post(`${refreshToken}`, {}, {
        withCredentials: true
    })
    return res.data
}

// export const RefreshToken = async (rfToken) => {
//     console.log('refreshToken', rfToken)
//     const res = await axiosJWT.post(`${refreshToken}`, {}, {
//         withCredentials: true,
//         headers: {
//             'Authorization': `${rfToken}`
//         }
//     })
//     return res.data
// }

export const LogoutUser = async () => {
    const res = await axios.post(`${logoutUser}`, {}, { withCredentials: true, })
    return res.data
}

export const UpdateUser = async (id, data, access_token) => {
    // console.log('>> check service: ', data)
    const res = await axiosJWT.put(`${updateUser}/${id}`, data, {
        withCredentials: true,
        headers: {
            'Authorization': `${access_token}`
        }
    })
    return res.data
}

export const DeleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${deleteManyUser}`, data, {
        withCredentials: true,
        headers: {
            'Authorization': `${access_token}`
        }
    })
    return res.data
}