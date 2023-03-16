import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import AddDishService from "../../services/AddDishService";
import * as AiIcons from 'react-icons/ai';
import "./MenuPage.scss";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MenuPage = () => {
  let navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [currentIndex] = useState(-1);

  const initialDishState = {
    id: null,
    name: "",
  };
  const [currentDish, setCurrentDish] = useState(initialDishState);

  useEffect(() => {
    retrieveDish();
  }, []);

  const retrieveDish = () => {
    AddDishService.getAll()
      .then(response => {
        setDishes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDish = (d) => {
    AddDishService.remove(d.id)
      .then(response => {
        setDishes(dishes.filter(dish => dish.id !== d.id));
        setCurrentDish(initialDishState);
        Swal.fire({
          title: 'Successfully deleted',
          icon: 'success',
          timer: 2000
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <Header />
      <div className="dishes">
        <div className="col-md-6">
          <h4 className="title-menu">Menu</h4>
          <br />
          <div className="general">
            {
              dishes.map((d, index) => (
                <div key={index} className="group-item-dish">
                  {d.name}
                  <div className="menu-buttons">
                    <button className="edit-dish" onClick={() => navigate('/EditDish/' + d.id)}>Edit</button>
                    <button className="delete-dish" onClick={() => deleteDish(d)}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <img src="/images/background.png" alt="background-tomato" className="background-logo1" />
    </>
  );
};

export default MenuPage;