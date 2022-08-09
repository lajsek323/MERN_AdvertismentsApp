import axios from 'axios'



const API_URL = '/api/ads/'




const createAd = async(adData, token) => {
    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,adData, config)

    return response.data
}



const deleteAd = async(id, token) => {
    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id,config)

    return response.data
}


const updateAd = async(adData, id, token) => {
    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + id,adData,config)

    return response.data
}



const getAds = async () => {
   
  
    const response = await axios.get(API_URL)
  
    return response.data
  }






const adService = {
    createAd, getAds, deleteAd,updateAd
}

export default adService


