import React, { useState } from 'react';
import '../../styles/DashInventory.css'; 

const DashboardInventoryPage = () => {
  const [foodItems, setFoodItems] = useState([
    { name: 'Chicken', quantity: 5, weight: 200 },
    { name: 'Steak', quantity: 8, weight: 120 },
    { name: 'Rice', quantity: 12, weight: 150 },
  ]);

  //State for sorting direction
  const [sortDirection, setSortDirection] = useState('asc');

  //State to control if the modal is open or not
  const [modalOpen, setModalOpen] = useState(false);

  //State to track the current item being edited or added
  const [currentItem, setCurrentItem] = useState(null);

  //State to know if we're editing or adding a new item
  const [isEditMode, setIsEditMode] = useState(false);

  //State for item form
  const [newItem, setNewItem] = useState({ name: '', quantity: '', weight: '' });

  function sortItems(key) {
    let sorted = [...foodItems];
    sorted.sort((a, b) => (sortDirection === 'asc' ? a[key] > b[key] : a[key] < b[key]) ? 1 : -1);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setFoodItems(sorted);
  }

  //Open Edit/Add Panel
  const openModal = (item = null) => {
    setModalOpen(true);
    setCurrentItem(item);
    setIsEditMode(item !== null); //Check if item already exists
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({ name: '', quantity: '', weight: '' });
    }
  };

  //Form submission
  const handleSubmit = () => {
    if (isEditMode) {
      //Update existing item
      setFoodItems(foodItems.map(i => (i.name === currentItem.name ? newItem : i)));
    } else {
      //Add a new item
      setFoodItems([...foodItems, newItem]);
    }
    setModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <h1 ClassName="title">Inventory</h1>

      <table className="inventory-table">
        <thead>
          <tr>
            <th onClick={() => sortItems('name')}>Name</th>
            <th onClick={() => sortItems('quantity')}>Quantity</th>
            <th onClick={() => sortItems('weight')}>Weight (g)</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.weight}</td>
              <td>
              {!modalOpen && ( // Hide edit button if modal is open
                  <button className="edit-button" onClick={() => openModal(item)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!modalOpen && (
        <div className="button-container">
          <button type="button" className="add-button" onClick={() => openModal(null)}>Add</button>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">{isEditMode ? 'Edit Item' : 'Add Item'}</h2>
            <label>
              Name:
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </label>
            <label>
              Weight:
              <input
                type="number"
                value={newItem.weight}
                onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInventoryPage;
