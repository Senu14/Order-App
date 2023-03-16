import React from "react";
import { useState, useEffect} from "react"; 
import  ReactDOM  from "react-dom";
import { Route, Router } from "react-router-dom";
import './ShoppingListPage.scss';
import Header from '../../components/Header'




const ShoppingListPage = () => {
    return (  
        <>
        <Header />
        <div className="shopping-container">

          <h1 className="underline-shop">SHOPPING LIST</h1>

          <div className="shopping-a">
            <p>Name</p>
            <p>Ingredients</p>
            <p>Qty(g)</p>
          </div>
          <div className="shopping-qty">
            <p className="item-name">Burger</p>

            <div className="ingredients">
              <p>Sauce</p>
              <p>Meat</p>
            </div>

            <div className="qtyg">
              <p>350</p>
              <p>3500</p>
            </div>
          </div>
            <div className="underline-line">
              <p>Next Item</p>
            </div>
        </div>
        </>
     );
}
 
export default ShoppingListPage;