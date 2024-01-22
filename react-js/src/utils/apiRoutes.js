const host = 'http://localhost:5000/api';

//user
export const loginUser = `${host}/user/signin`
export const signupUser = `${host}/user/create`
export const getDetailsUser = `${host}/user/get-details`
export const deleteUser = `${host}/user/delete-user`
export const getAllUser = `${host}/user/getAll`
export const refreshToken = `${host}/user/refresh-token`
export const logoutUser = `${host}/user/log-out`
export const updateUser = `${host}/user/update-user`
export const deleteManyUser = `${host}/user/delete-many`


//product
export const getAllProduct = `${host}/product/get-all`

//order