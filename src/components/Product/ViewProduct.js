import React from "react";
import Card from "../UI/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import constants from "../../utils/constant";
const ViewProduct = (props) => {
  const { _id, name, description, color, price } = props.product;
  return (
    <React.Fragment>
      <Card className="view-card product-card-form">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/867px-Picture_icon_BLACK.svg.png"
          className="card-img-top mx-auto"
          alt=""
        />
        <div className="card-body">
          <p className="prd-card-show-lb">Product Description</p>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="prd-card-show-lb">Product Name</p>
              </div>
              <div className="col">
                <p className="prd-card-show-txt">{name}</p>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="prd-card-show-lb">Product Color</p>
              </div>
              <div className="col">
                <p className="prd-card-show-txt">{color}</p>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="prd-card-show-lb">Product Price</p>
              </div>
              <div className="col">
                <p className="prd-card-show-txt">{price}</p>
              </div>
            </div>
          </li>
        </ul>
        <div
          style={{ width: "100%", marginTop: "0.3rem" }}
          onClick={props.onBackdropClick}
        >
          {props.role !== constants.roles.SUPPORTER &&
            props.role !== constants.roles.CUSTOMER && (
              <div style={{ float: "right" }}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="font-product-a"
                  onClick={() => props.onEditClickHandler(props.product)}
                />
              </div>
            )}
          {props.role !== constants.roles.SELLER &&
            props.role !== constants.roles.CUSTOMER && (
              <div style={{ float: "left" }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="font-product-a"
                  onClick={() => props.onDeleteClickHandler(props.product)}
                />
              </div>
            )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ViewProduct;
