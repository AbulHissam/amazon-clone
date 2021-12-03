import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-17ec5/us-central1/api",
});
export default instance;
