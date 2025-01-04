import React, { useState } from 'react';
import axios from '../../utils/api';
import './form.css';

const InventoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specifics: '',
    dateOfPurchase: '',
    quantity: '',
    purchasePrice: '',
    discount: '',
    mrp: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory/add', formData);
      alert('Inventory added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add inventory');
    }
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h2>Add Inventory</h2>
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} />
      <input type="text" name="specifics" placeholder="Specifics (Flavor, weight, etc.)" onChange={handleChange} />
      <input type="date" name="dateOfPurchase" onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
      <input type="number" name="purchasePrice" placeholder="Purchase Price" onChange={handleChange} />
      <input type="number" name="discount" placeholder="Discount (%)" onChange={handleChange} />
      <input type="number" name="mrp" placeholder="MRP" onChange={handleChange} />
      <input type="date" name="expiryDate" placeholder="Expiry Date" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InventoryForm;
