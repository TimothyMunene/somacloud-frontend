import axios from "./axios";

const login = (body) => {
  const url = "/auth/login";
  const form = {
    "schoolCode": body.code,
    "username": body.email,
    "password": body.password,
  };

  return axios.get(`/schools/${body.code}`)
    .then((response) => {
      localStorage.setItem("school", JSON.stringify(response.data));
      
      
      return axios.post(url, form);
    })
    .then((response) => {
      const isUserDataStored = response?.data ? true : false;
      
      localStorage.setItem("user", JSON.stringify(response.data.data));
      

      const user = JSON.parse(localStorage.getItem("user"));
      

      if (isUserDataStored) {
        // You can add any additional logic here to handle the successful user data storage
      }

      return isUserDataStored;
    })
    .catch((error) => {
      console.error("Error saving user data:", error);
      return false;
    });
};

const signup = (body) => {
  const url = "/auth/signup";
  return axios.post(url, body).then((response) => response.data);
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("school");
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const getCurrentSchool = () => JSON.parse(localStorage.getItem("school"));

const AuthService = {
  login,
  signup,
  logout,
  getCurrentUser,
  getCurrentSchool,
};

export default AuthService;