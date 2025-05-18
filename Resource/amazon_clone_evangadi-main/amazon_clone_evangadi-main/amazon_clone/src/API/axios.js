import axios from "axios";

const axiosInstance = axios.create({
// backend deployed on render
  baseURL: "https://amazon-backend-kjkt.onrender.com"

  // backend locally using firebase functions
  // baseURL: "http://127.0.0.1:5001/finto-56024/us-central1/api",

  // backend locally using express server on port 5000
  // baseURL: "http://localhost:5000"

});

export { axiosInstance };