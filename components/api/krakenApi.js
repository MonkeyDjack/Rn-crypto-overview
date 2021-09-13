import axios from "axios";

export default axios.create({
    baseURL: "https://api.kraken.com/0/public"
})