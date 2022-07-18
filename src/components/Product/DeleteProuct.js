import React from "react";
import Button from "../common/Button";
import Card from "../UI/Card/Card";

const DeleteProduct = (props) => {
  const { name } = props.product;
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onBackdropClick} />;
      <Card className="add-prod-modal">
        <p className="c-p del-prod">Do you want to delete {name}</p>
        <div className="c-prdct-btn">
          <div className="row">
            <div className="col">
              <Button
                name="yes"
                value="YES"
                wrapperClass="d-flex justify-content-center"
                buttonClass="c-btn"
                buttonClicked={props.onDelete}
              />
            </div>
            <div className="col">
              <Button
                name="no"
                value="NO"
                wrapperClass="d-flex justify-content-center"
                buttonClass="c-btn"
                buttonClicked={props.onClickCancel}
              />
            </div>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default DeleteProduct;
