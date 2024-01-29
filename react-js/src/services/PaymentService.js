import axios from "axios"
import { payment } from '../utils/apiRoutes'
export const getConfig = async () => {
    const res = await axios.get(`${payment}`)
    return res.data
}