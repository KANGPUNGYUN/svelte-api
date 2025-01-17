import axios from "axios";

const send = async ({
  method = "",
  path = "",
  data = {},
  access_token = "",
} = {}) => {
  const commonUrl = "http://localhost:3000";
  const url = commonUrl + path;

  const headers = {
    "Access-Control-Arrow-Origin": commonUrl,
    "Access-Control-Arrow-Credentials": true,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    SameSite: "None",
    Authorization: access_token,
  };

  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getApi = ({ path = "", access_token = "" } = {}) => {
  return send({ method: "GET", path, access_token });
};

const putApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({ method: "PUT", path, data, access_token });
};

const postApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({ method: "POST", path, data, access_token });
};

const deleteApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({ method: "DELETE", path, data, access_token });
};

export { getApi, putApi, postApi, deleteApi };
