import constants from "../utils/constant";

const baseUrl = constants.baseUrl;
const userUrl = constants.apiUserModel;

const signUp = (user) => {
  return fetch(baseUrl + userUrl + "add", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok || response.status === 422) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

const login = (loginCredentials) => {
  return fetch(baseUrl + userUrl + "login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      //   authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(loginCredentials),
  })
    .then((response) => {
      if (response.ok || response.status === 422 || response.status === 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

export default { signUp, login };
