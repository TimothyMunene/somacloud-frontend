import axios from "axios";

const instance = axios.create({ baseURL: "https://somacloud.co.ke/somacloud/api/v1" });
//const instance = axios.create({ baseURL: "http://127.0.0.1:6005/somacloud/api/v1" });

instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
