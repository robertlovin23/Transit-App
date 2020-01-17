import axios from 'axios'

export default axios.create({
    baseURL: "https://transit.land/api/v1/",
    params: {
        sort_order: "asc",
        retry_after: 3000
    }
})