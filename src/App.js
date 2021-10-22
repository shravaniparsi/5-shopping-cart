import "./App.css";
import React, { useState, useRef } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Products from "./containers/products/products";
import Cart from "./containers/cart/cart";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import axios from "axios";

function App(props) {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Website", key: "website" }
  ];
  const csvLinkEl = useRef(null);
  const getUserList = () => {
    return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
      res.json()
    );
  };
  const downloadReport = async () => {
    const data = await getUserList();
    setcsvData(data, csvData => {
      setTimeout(() => {
        csvLinkEl.current.link.click();
     });
    });
  };
  const [csvData, setcsvData] = useStateWithCallbackLazy([]);
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p className="navtext">shopping cart by shravani parsi</p>
          <input
            type="button"
            value="Export to CSV (Async)"
            onClick={downloadReport}
          />
          <CSVLink
            headers={headers}
            asyncOnClick={true}
            filename="Clue_Mediator_Report_Async.csv"
            data={csvData}
            ref={csvLinkEl}
          />
          <Link className="cartButton" to="/cart">
            <i className="fa badge" value={props.cartList.length}>
              &#xf07a;
            </i>
          </Link>
        </header>
        <main>
          <Route path="/" exact component={Products}></Route>
          <Route path="/cart" component={Cart}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = state => {
  return {
    cartList: state.addedProductList
  };
};
export default connect(mapStateToProps)(App);
