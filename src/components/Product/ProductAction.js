import React from "react";
import Card from "../UI/Card/Card";
import AddProduct from "./AddProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import constants from "../../utils/constant";

const ProductAction = (props) => {
  return (
    <React.Fragment>
      {props.showAddProductCard && (
        <AddProduct
          onBackdropClick={props.onBackdropClick}
          product={props.product}
          onChangeHandler={props.onChangeHandler}
          error={props.error}
          onSave={props.onSave}
        />
      )}
      <div className="row c-actn-row">
        <Card className="product-a-card-form">
          <div className="row">
            <div className="col">
              <p className="c-p">Product Actions</p>
            </div>
            {(props.role === constants.roles.ADMIN ||
              props.role === constants.roles.SELLER) && (
              <div className="col" style={{ float: "right" }}>
                <p className="font-product-a-p" onClick={props.addProductCard}>
                  <FontAwesomeIcon icon={faPlus} className="font-product-a" />
                  <h6>Add Product</h6>
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProductAction;
