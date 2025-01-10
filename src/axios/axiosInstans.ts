import axios from "axios";

const Development_URl = "http://localhost:3000";
const Production_URl = "https://cloud-hosting-1slh.vercel.app";

const MAIN_URl =
  process.env.NODE_ENV === "production" ? Production_URl : Development_URl;

export const axiosInstans = axios.create({ baseURL: MAIN_URl });
