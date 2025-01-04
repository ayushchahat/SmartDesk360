import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/form.css';

const ReturnForm = () => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    discount: '',
    actualMoneyReceived: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/returns/process', formData);
      alert('Return processed successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to process return');
    }
  };

  return (
    <form className="return-form" onSubmit={handleSubmit}>
      <h2>Process Return</h2>
      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        onChange={handleChange}
      />
      <input
        type="number"
        name="discount"
        placeholder="Discount (%)"
        onChange={handleChange}
      />
      <input
        type="number"
        name="actualMoneyReceived"
        placeholder="Actual Money Received"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReturnForm;
