import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5001/clone-17ec5/us-central1/api",
  baseURL: "https://us-central1-clone-17ec5.cloudfunctions.net/api",
});
export default instance;
