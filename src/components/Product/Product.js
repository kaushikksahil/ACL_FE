import React, { useContext, useEffect, useState } from "react";
import ProductAction from "./ProductAction";
import ProductAPI from "../../api/product";
import { useHistory } from "react-router-dom";
import ViewProduct from "./ViewProduct";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProuct";
import { UserContext } from "../../context/create";

const Product = () => {
  const [showAddProductCard, setShowAddProductCard] = useState(false);
  const [error, setError] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [deleteProduct, setDeleteProduct] = useState("");
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  let user = useContext(UserContext).userData;
  console.log("user", user);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    color: "",
    price: "",
  });
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, []);

  const formValidation = () => {
    let _error = {};
    if (!product.name) _error.name = "Please fill Product Name";
    if (!product.description) _error.description = "Please fill Description";
    if (!product.color) _error.color = "Please fill color";
    if (!product.price) _error.price = "Please fill price";
    // if (!product.image) _error.image = "Please fill image";
    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const onChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductCard = () => {
    setShowAddProductCard(true);
  };

  const getProducts = (id) => {
    ProductAPI.getProducts(id).then((response) => {
      if (response && response.status === 401) {
        return history.push("/");
      }
      if (response) {
        setAllProducts(response.data);
      }
    });
  };

  const onBackdropClick = () => {
    setShowAddProductCard(false);
  };

  const onEditClickHandler = (product) => {
    setShowAddProductCard(true);
    setEditProductId(product._id);

    // getProducts(productId);
    setProduct(product);
    setIsEdit(true);
  };

  const onClickCancel = () => {
    setIsDeleteClicked(false);
    setIsEdit(false);
  };

  const onDeleteClickHandler = (product) => {
    setIsDeleteClicked(true);
    setDeleteProduct(product);
  };

  const onDelete = (product) => {
    ProductAPI.deleteProducts(deleteProduct._id).then((response) => {
      if (response && response.status === 401) {
        return history.push("/");
      }
      if (response && response.status === 422) {
        setError({ [response.field]: response.message });
      } else if (response) {
        onBackdropClick();
        setIsDeleteClicked(false);
        getProducts();
      } else {
        alert(
          "Internal error occured, Please connect with System Administrator"
        );
      }
    });
  };

  const onEditSave = (e) => {
    product._id = editProductId;
    ProductAPI.editProduct(product).then((response) => {
      if (response && response.status === 401) {
        return history.push("/");
      }
      if (response && response.status === 422) {
        setError({ [response.field]: response.message });
      } else if (response) {
        onBackdropClick();
        setIsEdit(false);
        getProducts();
      } else {
        alert(
          "Internal error occured, Please connect with System Administrator"
        );
      }
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!formValidation()) {
      return;
    } else {
      if (isEdit) {
        onEditSave();
        return;
      }
      ProductAPI.addProduct(product).then((response) => {
        if (response && response.status === 401) {
          return history.push("/");
        }
        if (response && response.status === 422) {
          setError({ [response.field]: response.message });
        } else if (response) {
          //getProducts();
          let savedProd = [...allProducts, response.data];
          setAllProducts(savedProd);
          setProduct({
            name: "",
            description: "",
            image: "",
            color: "",
            price: "",
          });
          onBackdropClick();
        } else {
          alert(
            "Internal error occured, Please connect with System Administrator"
          );
        }
      });
    }
  };
  return (
    <div className="row c-row">
      <h5 className="c-h5">
        Want a superweapon to ignite your customer’s interest in a product? It’s
        right under your nose: Take your product’s unique features and turn them
        into benefits. What are features and benefits? Think about what gets you
        excited about your product that makes it different from your
        competitors’ products. It might be careful construction, ethically
        sourced materials, or all the bells and whistles you dreamed up over
        drinks one night. Those are features. Now, think about what those things
        do for your customer. Does careful construction mean that your product
        is safe for children? Do ethically sourced materials make the buyer feel
        good about purchasing your product? Do those bells and whistles make
        everyone who sees your customer with your product weep with envy? Those
        are benefits. In product descriptions, it’s easy to fall into the trap
        of only describing the features of your products. But when you just list
        the features, you’re not actually helping your buyer understand how your
        product will help them. Let’s talk about a product page that
        communicates both features and benefits effectively.
      </h5>
      <div className="row">
        <ProductAction
          showAddProductCard={showAddProductCard}
          addProductCard={addProductCard}
          onBackdropClick={onBackdropClick}
          product={product}
          onChangeHandler={onChangeHandler}
          error={error}
          onSave={onSave}
          role={user.role}
        />
        {allProducts.length > 0 && isEdit && (
          <AddProduct
            showAddProductCard={showAddProductCard}
            onBackdropClick={onBackdropClick}
            product={product}
            onChangeHandler={onChangeHandler}
            error={error}
            onSave={onSave}
            onClickCancel={onClickCancel}
            isEdit={isEdit}
          />
        )}
        {isDeleteClicked && (
          <DeleteProduct
            product={deleteProduct}
            onBackdropClick={onBackdropClick}
            onDelete={onDelete}
            onClickCancel={onClickCancel}
          />
        )}
        {allProducts.length > 0 &&
          allProducts.map((_prod) => {
            return (
              <React.Fragment>
                <ViewProduct
                  product={_prod}
                  onBackdropClick={onBackdropClick}
                  onEditClickHandler={onEditClickHandler}
                  onDeleteClickHandler={onDeleteClickHandler}
                  role={user.role}
                />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Product;
