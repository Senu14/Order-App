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
        let datitos = event.target;

        let updateDish = {
            id: currentDish.id,
            name: datitos["name"].value,
        }

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
        Swal({
            title: "Update",
            text: "The dish was updated successfully!",
            icon: "success",

        })
    };
    return (
        <>
            <Header />
            <style>{'body {  background-color: var(--background); }'}</style>
            <div className="cabecera">
                <p className="dish-name">Edit dish</p>
            </div>

            <div className="form-d">
                <div>
                    <Form onSubmit={updateDish}>
                        <div className="container-d">
                            <Row className="mb-3">

                                <Form.Group as={Col} md="4"
                                    className="position-relative">
                                    <Form.Label> Name:</Form.Label>
                                    <Form.Control type="text"
                                        className="form-control"
                                        id="name" name="name"
                                        value={currentDish.name}
                                        onChange={handleInputChange} 
                                        required 
                                        />
                                </Form.Group>
                            </Row>
                        </div>       
                        <button type="submit" className="update-button" >
                            <BiIcons.BiEditAlt />Update
                        </button>
                    </Form>
                </div>
            </div >
        </>
    );
};

export default EditDish;
