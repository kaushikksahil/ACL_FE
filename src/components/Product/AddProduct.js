import React from "react";
import Card from "../UI/Card/Card";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AddProduct = (props) => {
  const { name, description, color, price } = props.product;
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onBackdropClick} />;
      <Card className="add-prod-modal">
        {!props.isEdit && (
          <p className="font-product-v-p" onClick={props.onBackdropClick}>
            <FontAwesomeIcon icon={faXmark} className="font-product-a" />
          </p>
        )}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/867px-Picture_icon_BLACK.svg.png"
          className="card-img-top mx-auto"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">Product Description</h5>
          <p className="card-text">
            <textarea
              class="form-control"
              rows="3"
              value={description}
              name="description"
              onChange={props.onChangeHandler}
            >
              {description}
            </textarea>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <TextInput
              id="name"
              name="name"
              label="Product Name"
              type="text"
              onChange={props.onChangeHandler}
              value={name}
              error={props.error.name}
            />
          </li>
          <li className="list-group-item">
            <TextInput
              id="color"
              name="color"
              label="Product Color"
              type="text"
              onChange={props.onChangeHandler}
              value={color}
              error={props.error.color}
            />
          </li>
          <li className="list-group-item">
            <TextInput
              id="price"
              name="price"
              label="Product Price"
              type="number"
              onChange={props.onChangeHandler}
              value={price}
              error={props.error.price}
            />
          </li>
        </ul>
        <div className="c-prdct-btn">
          {props.isEdit ? (
            <div className="row">
              <div className="col">
                <Button
                  name="save"
                  value="Save"
                  wrapperClass="d-flex justify-content-center"
                  buttonClass="c-btn"
                  buttonClicked={props.onSave}
                />
              </div>
              <div className="col">
                <Button
                  name="cancel"
                  value="Cancel"
                  wrapperClass="d-flex justify-content-center"
                  buttonClass="c-btn"
                  buttonClicked={props.onClickCancel}
                />
              </div>
            </div>
          ) : (
            <Button
              name="save"
              value="Save"
              wrapperClass="d-flex justify-content-center"
              buttonClass="c-btn"
              buttonClicked={props.onSave}
            />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AddProduct;
