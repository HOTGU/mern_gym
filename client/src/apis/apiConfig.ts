import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (
      config.url === "http://localhost:8000/api/user/refresh" ||
      status !== 401 ||
      config.sent
    ) {
      return Promise.reject(error);
    }

    config.sent = true;

    // refresh 처리
    instance.post("/api/user/refresh").then((res) => {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
    });

    return instance(config);
  }
);

export default instance;
