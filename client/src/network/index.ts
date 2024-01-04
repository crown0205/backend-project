import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const HOST_URL = process.env.REACT_APP_API_URL ?? "";

const axiosInstance = axios.create({
  baseURL: HOST_URL,
  headers: {
    Authorization: "",
  },
});

export type HttpURLType = "get" | "post" | "put" | "delete";

export interface RequestParams<R> {
  method: HttpURLType;
  url: string;
  requestBody?: R;
  requestParams?: R;
  isMultipart?: boolean;
}

const request = async <R, T>({
  method,
  url,
  requestBody,
  requestParams,
}: RequestParams<R>): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    params: requestParams,
  };

  axiosInstance.interceptors.request.use((interceptorsConfig) => {
    const { headers } = interceptorsConfig;

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return interceptorsConfig;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError | Error): Promise<AxiosError> => {
      console.log("ERROR >>>", error);
      const { response } = error as unknown as AxiosError;
      const { status, data } = response as AxiosResponse;

      if (status === 401) {
        const navigate = useNavigate();
        localStorage.removeItem("token");
        navigate("/", { replace: true });
        console.log("token 제거함");
        return Promise.reject(data?.message);
      }

      if (status < 500) {
        return Promise.reject(data?.message);
      }

      if (status >= 500) {
        return Promise.reject(`서버 에러가 발생 했습니다 ${error}`);
      }

      return Promise.reject(`알수 없는 에러가 발생 했습니다 ${error}`);
    }
  );

  switch (method) {
    case "get": {
      return axiosInstance.get(url, config);
    }
    case "post": {
      return axiosInstance.post(url, requestBody, config);
    }
    case "put": {
      return axiosInstance.put(url, requestBody, config);
    }
    case "delete": {
      return axiosInstance.delete(url, {
        data: requestBody,
      });
    }

    default: {
      return Promise.reject(new Error("Invalid HttpMethod"));
    }
  }
};

export default request;
