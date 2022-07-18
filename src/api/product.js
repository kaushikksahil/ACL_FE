import constants from "../utils/constant";

const baseUrl = constants.baseUrl;
const productUrl = constants.apiProductModel;

const addProduct = (product) => {
  return fetch(baseUrl + productUrl + "/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (response.ok || response.status === 422) {
        return response.json();
      } else if (response.status === 401) {
        return response.json({ status: 401 });
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

const editProduct = (product) => {
  return fetch(baseUrl + productUrl + "/" + product._id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (response.ok || response.status === 422) {
        return response.json();
      } else if (response.status === 401) {
        return response.json({ status: 401 });
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

const getProducts = (id) => {
  const appendId = id === undefined ? "" : "/" + id;
  return fetch(baseUrl + productUrl + appendId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

const deleteProducts = (id) => {
  return fetch(baseUrl + productUrl + "/" + id, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("API call failed. " + error);
      throw error;
    });
};

export default { addProduct, getProducts, editProduct, deleteProducts };
