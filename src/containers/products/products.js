import "./products.css";
import productsList from "./../../products-list.json";
import { connect } from "react-redux";

const products = props => {

  const getButtonLabel = id => {
    const isProductAdded = props.cartList.find(item => item.id === id);
    return isProductAdded ? "Go to Cart >" : "add to cart";
  };
  
  const individualProduct = productsList.map((item, index) => {
    return (
      <article key={index}>
        <div className="card">
          <img className="card-image" src={item.img} alt="Denim Jeans" />
          <h1 className="card-title">{item.name}</h1>
          <p className="price">${item.price}</p>
          <p>
            <button
              onClick={() => {
                if (props.cartList.find(i => i.id === item.id)) {
                  props.history.push({ pathname: "/cart" });
                } else {
                  props.onAddProduct(item);
                }
              }}
            >
              {getButtonLabel(item.id)}
            </button>
          </p>
        </div>
      </article>
    );
  });

  return <div className="products-wrapper">{individualProduct}</div>;
};

const mapStateToProps = state => {
  return {
    cartList: state.addedProductList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: val => dispatch({ type: "ADD_PRODUCT", payLoad: val })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(products);
