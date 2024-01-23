const host = 'http://localhost:5000/api';

//user
export const loginUser = `${host}/user/signin`
export const signupUser = `${host}/user/create`
export const getDetailsUser = `${host}/user/get-details`
export const deleteUser = `${host}/user/delete-user`
export const getAllUser = `${host}/user/getAll`
export const refreshToken = `${host}/user/refresh-token`
export const logoutUser = `${host}/user/signout`
export const updateUser = `${host}/user/update-user`
export const deleteManyUser = `${host}/user/delete-many`


//product
export const getAllProduct = `${host}/product/get-all`
export const getProductType = `${host}/product/get-all`
export const createProduct = `${host}/product/create`
export const getDetailsProduct = `${host}/product/get-details`
export const updateProduct = `${host}/product/update`
export const deleteProduct = `${host}/product/delete`
export const deleteManyProduct = `${host}/product/delete-many`
export const getAllTypeProduct = `${host}/product/get-all-type`

//order