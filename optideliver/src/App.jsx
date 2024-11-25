import { useState, useEffect } from 'react';
import './App.css';
// checking git commit
function App() {
  // State for Postmen
  const [postmen, setPostmen] = useState([]);
  const [newPostman, setNewPostman] = useState({
    postman_name: '',
    postman_phone: '',
    pincode: '',
    availability_status: true,
  });

  // State for Customers
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone_number: '',
    pincode: '',
    preferred_slot: '',
    address: [],
  });

  // State for Orders
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer_id: '',
    postman_id: '',
    order_date: '',
    delivery_date: '',
    pincode: '',
    slot_predicted: '',
    slot_confirmed: '',
    delivery_status: 'Pending',
    item_type: '',
  });

  // Fetch Postmen
  useEffect(() => {
    fetch('http://localhost:5000/api/postmen')
      .then((res) => res.json())
      .then((data) => setPostmen(data))
      .catch((err) => console.error('Error fetching postmen:', err));
  }, []);

  // Fetch Customers
  useEffect(() => {
    fetch('http://localhost:5000/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  // Fetch Orders
  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  // Add Postman
  const addPostman = () => {
    fetch('http://localhost:5000/api/postmen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostman),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostmen([...postmen, data]);
        setNewPostman({
          postman_name: '',
          postman_phone: '',
          pincode: '',
          availability_status: true,
        });
      })
      .catch((err) => console.error('Error adding postman:', err));
  };

  // Add Customer
  const addCustomer = () => {
    fetch('http://localhost:5000/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers([...customers, data]);
        setNewCustomer({
          name: '',
          phone_number: '',
          pincode: '',
          preferred_slot: '',
          address: [],
        });
      })
      .catch((err) => console.error('Error adding customer:', err));
  };

  // Add Order
  const addOrder = () => {
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders([...orders, data]);
        setNewOrder({
          customer_id: '',
          postman_id: '',
          order_date: '',
          delivery_date: '',
          pincode: '',
          slot_predicted: '',
          slot_confirmed: '',
          delivery_status: 'Pending',
          item_type: '',
        });
      })
      .catch((err) => console.error('Error adding order:', err));
  };

  // Delete Postman
  const deletePostman = (id) => {
    fetch(`http://localhost:5000/api/postmen/${id}`, { method: 'DELETE' })
      .then(() => setPostmen(postmen.filter((postman) => postman._id !== id)))
      .catch((err) => console.error('Error deleting postman:', err));
  };

  // Delete Customer
  const deleteCustomer = (id) => {
    fetch(`http://localhost:5000/api/customers/${id}`, { method: 'DELETE' })
      .then(() => setCustomers(customers.filter((customer) => customer._id !== id)))
      .catch((err) => console.error('Error deleting customer:', err));
  };

  // Delete Order
  const deleteOrder = (id) => {
    fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' })
      .then(() => setOrders(orders.filter((order) => order._id !== id)))
      .catch((err) => console.error('Error deleting order:', err));
  };

  return (
    <div className="App">
      <h1>Delivery Management Dashboard</h1>

      {/* Postmen Section */}
      <h2>Postmen</h2>
      <div>
        {postmen.map((postman) => (
          <div key={postman._id}>
            <p>{postman.postman_name}</p>
            <button onClick={() => deletePostman(postman._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Customers Section */}
      <h2>Customers</h2>
      <div>
        {customers.map((customer) => (
          <div key={customer._id}>
            <p>{customer.name}</p>
            <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <h2>Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <p>{order.item_type}</p>
            <button onClick={() => deleteOrder(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
