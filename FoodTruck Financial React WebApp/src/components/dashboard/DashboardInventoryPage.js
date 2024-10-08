import React, { useState } from 'react';

import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"

import '../../styles/DashInventory.css'; 

const DashboardInventoryPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    {name: "Steak", weight: "10kgs", status: "stocked"},
    {name: "Chicken ", weight: "10kgs", status: "limited"},
    {name: "Pork ", weight: "10kgs", status: "depleted"},
  ]);

  const [rowtoEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };


  const [formState, setFormState] = useState({
    name: "",
    weight: "",
    status: "stocked",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if(formState.name && formState.weight && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for(const [key, value] of Object.entries(formState)) {
        if(!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setFormState(rows[idx]);
    setModalOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    onSubmit(formState);
    setModalOpen(false);

    setFormState({
      name: "",
      weight: "",
      status: "stocked",
    });
  };

  const onSubmit = (newRow) => {
    rowtoEdit === null ?
    setRows([...rows, newRow]) :
    setRows(rows.map((currRow, idx) => {
      if(idx !== rowtoEdit) return currRow

      return newRow;
    })
  );
  };

  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='expand'>Weight</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row,idx) => {
              const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);


              return <tr key={idx}>
                <td>{row.name}</td>
                <td className='expand'>{row.weight}</td>
                <td>
                  <span className={`label label-${row.status}`}>{statusText}</span>
              </td>
              <td>
                <span className='actions'>
                  <BsFillTrashFill className='delete-btn' onClick={() => handleDeleteRow(idx)}/>
                  <BsFillPencilFill onClick={() => handleEditRow(idx)}/>
                </span>
              </td>
              </tr>
            })
          }
        </tbody>
      </table>

      <button className='btn add-btn' onClick={() =>{
        setRowToEdit(null);
        setFormState({
          name: "",
          weight: "",
          status: "stocked",
        });
        setModalOpen(true)
        }}>
          Add
          </button>

      {modalOpen && <div className='modal-container' onClick={(e) => {
        if(e.target.className === 'modal-container') setModalOpen(false)
        }}
        >
        <div className='modal'>
        <form>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input 
              name='name' 
              value={formState.name} 
              onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor='weight'>Weight</label>
              <textarea 
              name='weight' 
              value={formState.weight} 
              onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <select 
              name='status' 
              value={formState.status} 
              onChange={handleChange}>
                <option value='stocked'>Stocked</option>
                <option value='limited'>Limited</option>
                <option value='depleted'>Depleted</option>
              </select>
            </div>
            {errors && <div className='error'>{`Please include: ${errors}`}</div>}
            <button type='submit' className='btn' onClick={handleSubmit}>
              Submit
              </button>
        </form>
        </div>
      </div>}
    </div>
  );
};

export default DashboardInventoryPage;
