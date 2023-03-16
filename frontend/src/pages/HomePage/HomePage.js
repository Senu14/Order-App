import React from "react";
import { useState, useEffect} from "react"; 
import  ReactDOM  from "react-dom";
import { Link, Route, Router } from "react-router-dom";
import './HomePage.scss';
import { BiChevronRight} from "react-icons/bi";
import Header from "../../components/Header";
const HomePage = () => {

    return (
        <>
        <Header/>
          <div className="homepage">
           
            <button className="buttonhomepage">Add menu item
            <Link to="/AddmenuPage">
              <div className="icon">
                <BiChevronRight/>
              </div>
              </Link>
            </button>
            
            

            <button className="buttonhomepage">Create order
            <Link to="/CreateOrderPage">
              <div className="icon">
                <BiChevronRight/>
              </div>
              </Link> 
            </button>


            <button className="buttonhomepage">Shopping list
            <Link to="/ShoppingListPage">
              <div className="icon">
                <BiChevronRight/>
              </div>
              </Link> 
            </button>
 

            <button className="buttonhomepage">Menu
            <Link to="/MenuPage">
              <div className="icon">
                <BiChevronRight/>
              </div>
              </Link> 
            </button>


            <button className="buttonhomepage">Contact us
            <Link to="/ContactPages">
              <div className="icon">
                <BiChevronRight/>
              </div>
              </Link> 
             </button>
          </div>

          <img src="/images/tomato.png" alt="background-tomato" className="background-tomato2" />
        </>
    )
}


export default HomePage;