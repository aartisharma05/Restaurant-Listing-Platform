import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
   const [restaurants, setRestaurants] = useState([]);
   const [newRestaurant, setNewRestaurant] = useState({
     name: "",
     address: "",
     contact: "",
   });
   useEffect(() => {
     fetchRestaurants();
   }, []);

   const fetchRestaurants = async () => {
     const response = await axios.get("http://localhost:3001/restaurants");
     setRestaurants(response.data);
   };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRestaurant({ ...newRestaurant, [name]: value });
    };

    const addRestaurant = async () => {
      await axios.post("http://localhost:3001/restaurants", newRestaurant);
      setNewRestaurant({ name: "", address: "", contact: "" });
      fetchRestaurants();
    };

     const updateRestaurant = async (id) => {
       // Implement update functionality here
     };

      const deleteRestaurant = async (id) => {
        await axios.delete(`http://localhost:3001/restaurants/${id}`);
        fetchRestaurants();
      };
  return <div className="App">
    <h1>Restaurant Listing</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.address} - {restaurant.contact}
            <button onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Restaurant</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newRestaurant.name}
          onChange={handleInputChange}
          />
          <input
          type="text"
          name="address"
          placeholder="Address"
          value={newRestaurant.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newRestaurant.contact}
          onChange={handleInputChange}
        />
        <button onClick={addRestaurant}>Add Restaurant</button>
      </div>
        

    
    
    </div>;
}

export default App;
