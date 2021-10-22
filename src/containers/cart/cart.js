import "./cart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const cart = props => {
  const cart = props.cartList;
  const individualCartItem = cart.map((item, index) => {
    return (
      <div className="item" key={index}>
        <div className="image">
          <img src={item.img} alt={item.name} />
        </div>

        <div className="description">
          <span>{item.name}</span>
        </div>

        <div className="description">
          <span>{item.price}</span>
        </div>

        <button
          className="delete-icon"
          onClick={() => {
            props.onDeleteProduct(item);
          }}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  });
  return (
    <div className="shopping-cart">
      <div className="title">Shopping Bag</div>
      {individualCartItem}
      <Link to="/">Go back to Product Page</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cartList: state.addedProductList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct: val => dispatch({ type: "DELETE_PRODUCT", payLoad: val })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cart);
