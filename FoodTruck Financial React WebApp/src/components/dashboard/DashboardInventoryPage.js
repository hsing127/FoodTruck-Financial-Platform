import React, { useState } from 'react';
import '../../styles/DashInventory.css'; 

const DashboardInventoryPage = () => {
    //Sample Data
    const [foodItems, setFoodItems] = useState([
      { name: 'Chicken', quantity: 5, weight: 200 },
      { name: 'Steak', quantity: 8, weight: 120 },
      { name: 'Rice', quantity: 12, weight: 150 },
    ]);
  
  //State for keeping track of sorting direction
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  //Sorts list depending on key type clicked
  function sortItems(key) {
    let sorted = [...foodItems];
    if (sortDirection === 'asc') {
      sorted.sort((a, b) => (a[key] > b[key] ? 1 : -1)); //Ascending
      setSortDirection('desc');
    } else {
      sorted.sort((a, b) => (a[key] < b[key] ? 1 : -1)); //Descending
      setSortDirection('asc');
    }
    setSortKey(key);
    setFoodItems(sorted);
  }

  return (
    <div className="dashboard-container">
      <h1>Inventory</h1>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardInventoryPage;
