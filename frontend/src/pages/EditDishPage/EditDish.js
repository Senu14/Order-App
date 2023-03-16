// import React, { useState, useEffect } from "react";
// import "./EditMenuPage.scss";
// import Header from "../../components/Header";
// import Swal from "sweetalert2";
// import IngredientService from "../../services/IngredientService";
// import AddDishService from "../../services/AddDishService";
// import { useNavigate } from "react-router-dom";

// const EditDish = () => {
//   const navigate = useNavigate();
//   const [dishes, setDishes] = useState([]);
//   const [selectedDish, setSelectedDish] = useState(null);
//   const [ingredients, setIngredients] = useState([]);

//   const [dishName, setDishName] = useState("");

//   useEffect(() => {
//     AddDishService.getAll()
//       .then((response) => {
//         setDishes(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching dishes:", error);
//       });
//   }, []);

//   const handleDishSelection = (e) => {
//     const dishId = e.target.value;
//     if (dishId === "-1") {
//       setSelectedDish(null);
//       setDishName("");
//       setIngredients([]);
//       return;
//     }

//     AddDishService.get(dishId)
//       .then((response) => {
//         setSelectedDish(response.data);
//         setDishName(response.data.name);
//         setIngredients(response.data.ingredients);
//       })
//       .catch((error) => {
//         console.error("Error fetching dish:", error);
//       });
//   };

//   // ... (resto de las funciones como en AddMenuPage, adaptadas para editar en lugar de agregar)

//   return (
//     <>
//       <Header />
//       {/* ... (otros elementos de la página, como en AddMenuPage) */}
//       <div>
//         <select onChange={handleDishSelection}>
//           <option value="-1">Select a dish to edit</option>
//           {dishes.map((dish) => (
//             <option key={dish.id} value={dish.id}>
//               {dish.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedDish && (
//         // ... (formulario y elementos de la página para editar el plato y sus ingredientes)
//       )}
//     </>
//   );
// };

// export default EditDish;