import axios from "axios";
const api = axios.create({
  baseURL: "https://citydeft.com/api/wp-json/",
});

export { api };
