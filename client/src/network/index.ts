import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const HOST_URL = process.env.REACT_APP_API_URL;

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
      headers.Authorization = token;
    }

    return interceptorsConfig;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      // const { data } = response;

      // const token = data.token;

      // if (token) {
      //   localStorage.setItem("token", token);
      // }

      return response;
    },
    async (error: AxiosError) => {
      console.log("ERROR >>>", error);

      return error;
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
