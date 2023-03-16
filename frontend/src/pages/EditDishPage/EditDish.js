import React, { useState, useEffect } from "react";
import "./EditDish.scss";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as BiIcons from 'react-icons/bi';
import AddDishService from "../../services/AddDishService";
import { useParams, useNavigate } from 'react-router-dom';

const EditDish = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [dishName, setDishName] = useState("");

    const initialDishState = {
        id: null,
        name: "",
    };
    const [currentDish, setCurrentDish] = useState(initialDishState);

    const getDishById = id => {
        AddDishService.get(id)
            .then(response => {
                setCurrentDish({ ...response.data });
                setDishName(response.data.name);
            })
            .catch(e => {
                console.log(e);
            });
    };


    useEffect(() => {
        if (id)
            getDishById(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDish({ ...currentDish, [name]: value });
      };
      


    const updateDish = (event) => {
        event.preventDefault();
        let updateDish = {
            id: currentDish.id,
            name: currentDish.name,
          };

        AddDishService.update(updateDish.id, updateDish)
            .then(response => {
                console.log(response.data);
                updateAlert();
                navigate("/MenuPage");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const updateAlert = () => {
        const swal = new Swal({
            title: "Update",
            text: "The dish was updated successfully!",
            icon: "success",
        });
        swal.fire();
        navigate("/MenuPage");
    };



    return (
        <>
            <Header />
            <img src="/images/background.png" alt="background-logo" className="background-logo" />
            <div className="form-add">
                <p className="line-add">EDIT DISH</p>
                <div>
                    <form className="add-dish" onSubmit={updateDish}>
                        <div className="name-dish">
                            <p>Name</p>
                        </div>
                        <div className="menu-item-dish">
                            <input type="text"
                                className="edit-dish-form-control"
                                id="name" name="name"
                                value={currentDish.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="update-button">
                            Update
                        </button>

                    </form>
                </div>
            </div>
            <div className="form-d">

            </div >
        </>
    );
};

export default EditDish;
