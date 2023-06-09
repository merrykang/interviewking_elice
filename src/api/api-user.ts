import axios from "axios";
// axios.defaults.withCredentials = true;

export const getUserData = async () => {
  const data = await axios.get("http://34.22.79.51:5000/api/user");
  return data.data;
};
