import axios from "axios";
const api = axios.create({
  baseURL: "https://api.citydeft.com/wp-json/",
});

export { api };
