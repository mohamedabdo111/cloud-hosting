import { axiosInstans } from "@/axios/axiosInstans";
import axios from "axios";

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  username: string;
};
export const LoginApi = async (loginData: LoginUser) => {
  const response = await axios.post(
    "http://localhost:3000/api/users/login",
    loginData
  );

  return response.data;
};

export const LogoutApi = async () => {
  const response = await axiosInstans.get("/api/users/logout");
  return response.data;
};

export const RegisterApi = async (registerData: RegisterUser) => {
  const response = await axiosInstans.post("/api/users/register", registerData);
  return response.data;
};
