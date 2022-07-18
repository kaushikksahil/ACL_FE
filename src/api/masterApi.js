import constants from "../utils/constant";

const baseUrl = constants.baseUrl;
const materUrl = constants.apiMasterModel;

const getRole = () => {
  return fetch(baseUrl + materUrl + "role", { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

export default { getRole };
