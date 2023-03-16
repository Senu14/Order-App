import React, { useState } from "react";
import "./AddMenuPage.scss";
import Header from "../../components/Header";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import IngredientService from "../../services/IngredientService";
import AddDishService from "../../services/AddDishService";
import { useNavigate } from 'react-router-dom';

const AddMenuPage = () => {

  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "" }]);

  const [submitted, setSubmitted] = useState(false);
  const [dishName, setDishName] = useState("");

  const initialDishState = {
    id: null,
    name: "",
  };

  const [dish, setDish] = useState(initialDishState);

  const handleInputNameChange = (event) => {
    setDishName(event.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    const auxIngredients = [...ingredients];
    auxIngredients.splice(index, 1);
    setIngredients(auxIngredients);
  };

  const handleIngredientChange = (event, index, field) => {
    const auxIngredients = [...ingredients];
    auxIngredients[index][field] = event.target.value;
    setIngredients(auxIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: dishName,
    };

    AddDishService.create(data)
      .then((response) => {

        console.log(response.data);

        ingredients.map((i, index) => {
          const data = { dishId: response.data.id, name: i.name, amount: i.amount, unit: i.unit };
          IngredientService.create(data).then(response => {

          })
        });

        Swal.fire({
          title: "Successfully added",
          icon: "success",
          timer: 2000
        });

        navigate("/MenuPage");

      })
      .catch((e) => {
        console.log(e);
      });

    console.log("Form submitted:", ingredients);

  };

  return (
    <>
      <Header />
      <img src="/images/background.png" alt="background-logo" className="background-logo" />
      <div className="form-add">
        <p className="line-add">ADD DISH</p>
        <div>
          <form className="add-dish" onSubmit={handleSubmit}>
            <div className="name-dish">
              <p>Name</p>
            </div>
            <div className="menu-item-dish">
              <input
                className="dish-name"
                type="text"
                value={dishName}
                onChange={handleInputNameChange}
                name="name"
              />
            </div>
            <div className="text-style">
              <p className="text-1">Ingredients</p>
              <p className="text-2">Amount</p>
              <p className="text-2">Unit</p>
            </div>

            {ingredients.map((ingredient, index) => (
              <div key={index} className="input-container">
                <input
                  className="ingredient"
                  type="text"
                  value={ingredient.name}
                  onChange={(event) =>
                    handleIngredientChange(event, index, "name")
                  }
                />
                <input
                  className="input-create-dish"
                  type="number"
                  value={ingredient.amount}
                  onChange={(event) =>
                    handleIngredientChange(event, index, "amount")
                  }
                />
                <p className="text-3">g</p>
                {/* <button className="minus" onClick={() => handleDeleteIngredient(index)}><AiOutlineMinus /></button>
                <div className="button-container">
                  <button className="plus" onClick={handleAddIngredient}><AiOutlinePlus /></button>
                </div> */}
              </div>
            ))}

            <button type="submit" className="add">Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMenuPage;
