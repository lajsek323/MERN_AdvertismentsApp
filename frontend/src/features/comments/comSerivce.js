import axios from 'axios'



const API_URL = '/api/comments/addComment/'
const API_URL2 = '/api/comments/'




const adCom = async(adData, id, token) => {
    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + id,adData, config)
    console.log(response)

    return response.data
}



const deleteCom = async(id, token) => {
    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL2 + id,config)

    return response.data
}

const getComs = async () => {
   
  
    const response = await axios.get(API_URL2)
  
    return response.data
  }

const comService = {
    adCom,deleteCom,getComs
}

export default comService


