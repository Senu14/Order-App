import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "react-router-dom";
import './CreateOrderPage.scss';
import { BiChevronRight } from "react-icons/bi";
import Header from '../../components/Header'
import AddDishService from "../../services/AddDishService";
import { Link } from "react-router-dom";
import OrderService from "../../services/OrderService";


const CreateOrderPage = () => {

  const [inputList, setinputList] = useState([{ item: '', amount: '' }]);

  const [days, setDays] = useState(0);


  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  }
  const handleDeleteIngredient = (i) => {
    console.log("deleting")
    const newIngredients = [...inputList];
    newIngredients.splice(i, 1);
    console.log(i, newIngredients)
    setinputList(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await OrderService.create({ days, inputList });
      // Realizar acciones adicionales aquí, como guardar otros datos relacionados con la orden
      // Navega a la página de la lista de compras
      window.location.href = "/ShoppingListPage";
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const addMenuItem = (e) => {
    console.log(inputList)
    e.preventDefault()
    setinputList([...inputList, { item: '', amount: '' }]);
  }
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    AddDishService.getAll()
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, []);


  return (
    <>
      <Header />
      <h1 className="line">ORDER</h1>

      <form action="" onSubmit={handleSubmit}>
        <div >
          <p className="days-label">Create order for
            <input className="input-create1"
              type="number" value={days} onChange={(e) => setDays(e.target.value)} />
            day(s)
          </p>
        </div >

        <div>
          <div className="name-sales">
            <p className="name1">Dish name</p>
            <p className="ave-sale">Ave. sales/day</p>
          </div>

          {inputList.map((ingredient, i) => (

            <div key={i} className="menu-item">
              <select id="name" className="food-select" name='item' onChange={e => handleinputchange(e, i)}>
                <option> - - </option>
                {dishes.map((dish) => (
                  <option key={dish.id} value={dish.name}>{dish.name}</option>
                ))}
              </select>


              <input className="input-create2" type="number" name='amount' onChange={e => handleinputchange(e, i)} />
              <p className="delete" onClick={() => handleDeleteIngredient(i)}>Del</p>

            </div>
          ))}
        </div>

        <div>
        <button className="button-create" >Create and go to shopping list  <BiChevronRight /></button>
      </div>
      
      </form>
      <button className="add" onClick={addMenuItem}>
            Add item
      </button>  

      <img src="/images/tomato2.png" alt="background-tomato" className="background-tomato" />
    </>
  );
}

export default CreateOrderPage;