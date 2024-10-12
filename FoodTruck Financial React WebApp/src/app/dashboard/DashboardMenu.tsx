import React, { useState } from 'react';
import '../../styles/DashMenu.css'; 
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFilterCircle,
  BsSearch,
  BsPlusLg,
} from 'react-icons/bs';

interface RowData {
  image: string;
  name: string;
  price: number;
  category: string;
}

const DashboardMenuPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<RowData[]>([
    { image: 'burger.jpg', name: 'Burger', price: 10, category: 'Meat' },
    { image: 'fries.jpg', name: 'Fries', price: 8, category: 'Meat' },
    { image: 'chips.jpg', name: 'Chips', price: 9, category: 'Meat' },
  ]);
  
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [formState, setFormState] = useState<RowData>({
    image: '',
    name: '',
    price: 0,
    category: 'misc',
  });
  const [errors, setErrors] = useState<string>('');

  const handleDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const validateForm = (): boolean => {
    if (formState.name && formState.price >= 0) {
      setErrors('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(', '));
      return false;
    }
  };

  const handleEditRow = (idx: number) => {
    setRowToEdit(idx);
    setFormState(rows[idx]);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    setModalOpen(false);

    setFormState({
      image: '',
      name: '',
      price: 0,
      category: 'misc',
    });
  };

  const onSubmit = (newRow: RowData) => {
    if (rowToEdit === null) {
      setRows([...rows, newRow]);
    } else {
      setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          return newRow;
        })
      );
    }
  };

  return (
    <div className='table-container'>
     <div className='products-header'>
        <p>Menu</p>
        <div className='search-filter'>
          <div className='search-container'>
            <BsSearch className='search-icon' />
            <input type='text' className='search-input' placeholder='Search...' />
          </div>
          <button className='filter-icon-btn'>
            <BsFilterCircle className='filter-icon' />Filter
          </button>
        </div>
      </div>

      <table className='table'>
        <colgroup>
          <col className="image-col" />  {/* New image column */}
          <col className="name-col" />
          <col className="price-col" />
          <col className="category-col" />
          <col className="actions-col" />
        </colgroup>
        <thead>
          <tr>
            <th>Image</th> {/* Image column header */}
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const categoryText = row.category.charAt(0).toUpperCase() + row.category.slice(1);

            return (
              <tr key={idx}>
                <td><img src={row.image} alt={row.name} className='menu-image' /></td>  {/* Image cell */}
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>{categoryText}</td>
                <td>
                  <span className='actions'>
                    <BsFillTrashFill className='delete-btn' onClick={() => handleDeleteRow(idx)} />
                    <BsFillPencilFill onClick={() => handleEditRow(idx)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='add-btn-container'>
        <button className='btn add-btn' onClick={() => {
          setRowToEdit(null);
          setFormState({
            image: '',
            name: '',
            price: 0,
            category: 'misc',
          });
          setModalOpen(true);
        }}>
          <BsPlusLg className='add-icon' />
          Add Item
        </button>
      </div>

      {modalOpen && (
        <div className='modal-container' onClick={(e) => {
          if ((e.target as HTMLElement).className === 'modal-container') setModalOpen(false);
        }}>
          <div className='modal'>
            <form>
              <div className='form-group'>
                <label htmlFor='image'>Image URL</label>  {/* New image input */}
                <input
                  name='image'
                  value={formState.image}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  name='name'
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='price'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={formState.price}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select
                  name='category'
                  value={formState.category}
                  onChange={handleChange}
                >
                  <option value='meat'>Meat</option>
                  <option value='fruit'>Fruit</option>
                  <option value='dairy'>Dairy</option>
                  <option value='vegetable'>Vegetable</option>
                  <option value='misc'>Misc</option>
                </select>
              </div>
              {errors && <div className='error'>{`Please include: ${errors}`}</div>}
              <button type='submit' className='btn' onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardMenuPage;