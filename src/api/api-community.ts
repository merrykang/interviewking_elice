import axios from "axios";

export function fetchData() {
  return axios
    .get("http://34.22.79.51:5000/api/community/list")
    .then((response) => response.data);
}
