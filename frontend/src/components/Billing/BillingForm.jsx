import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import './form.css';

const BillingForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/inventory/expiring');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/billing/create', {
        productId: selectedProduct,
        quantity,
        price,
      });
      setBill(response.data);
      alert('Bill created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create bill');
    }
  };

  return (
    <div>
      <form className="billing-form" onSubmit={handleSubmit}>
        <h2>Create Bill</h2>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - {product.quantity} available
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create Bill</button>
      </form>

      {bill && (
        <div className="bill-summary">
          <h3>Bill Summary</h3>
          <p>Product: {bill.product}</p>
          <p>Quantity: {bill.quantity}</p>
          <p>Total: ₹{bill.total}</p>
        </div>
      )}
    </div>
  );
};

export default BillingForm;
