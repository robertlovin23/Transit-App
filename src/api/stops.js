import axios from 'axios'

export default axios.create({
    baseURL: "https://transit.land/api/v1/",
    params: {
        sortOrder: "asc"
    }
})