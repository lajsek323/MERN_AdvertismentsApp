import axios from 'axios'


const API_URL = '/api/users/'





const getUsers = async() => {
    const response = await axios.get(API_URL + 'getAll')

    return response.data
}




const getUser = async(id) => {
    const response = await axios.get(API_URL + 'getUsers/' + id )

    return response.data
}






const userService = {
     getUsers, getUser
}

export default userService


