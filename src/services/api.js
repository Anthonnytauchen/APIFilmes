import axios from "axios";
 const API_KEY = '16f41491'
 const BASE_URL = 'http://www.omdbapi.com/';
const api = axios.create({
     baseURL:BASE_URL
})

export default api; // Adicione a palavra "default" aqui