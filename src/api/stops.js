import axios from 'axios'

export default axios.create({
    baseURL: "https://transit.land/api/v1/",
    params: {
        sort_order: "asc",
        Retry_After: 3000
    }
})