import axios from "axios";

const MAIN_URl = "http://localhost:3000";
export const axiosInstans = axios.create({ baseURL: MAIN_URl });
