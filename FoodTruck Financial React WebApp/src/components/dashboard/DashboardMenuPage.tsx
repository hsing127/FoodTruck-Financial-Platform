import React, { useState } from 'react';
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFilterCircle,
  BsSearch,
  BsPlusLg,
} from 'react-icons/bs';

interface RowData {
  name: string;
  price: number;
}

const DashboardMenuPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<RowData[]>([
    { name: 'Steak', price: 10 },
    { name: 'Chicken', price: 8 },
    { name: 'Pork', price: 9 },
  ]);

  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [formState, setFormState] = useState<RowData>({
    name: '',
    price: 0,
  });
  const [errors, setErrors] = useState<string>('');

  const handleDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!value && key !== 'price') {
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
      name: '',
      price: 0,
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
    <div className='flex flex-col items-center justify-center h-screen bg-gray-800'>
      <div className='flex justify-between items-center w-full max-w-4xl my-8 p-4 bg-gray-700 rounded-lg'>
        <p className='text-white text-2xl'>Menu</p>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <BsSearch className='absolute left-2 text-gray-400' />
            <input
              type='text'
              className='pl-8 pr-4 py-2 bg-gray-600 text-white rounded-lg'
              placeholder='Search...'
            />
          </div>
          <button className='flex items-center px-4 py-2 bg-gray-600 rounded-lg text-gray-400'>
            <BsFilterCircle className='mr-2' /> Filter
          </button>
        </div>
      </div>

      <table className='min-w-full overflow-hidden table-auto border-collapse rounded-lg shadow-lg'>
        <thead className='bg-gray-900 text-gray-400'>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-gray-800 text-white'>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className='px-4 py-2'>{row.name}</td>
              <td className='px-4 py-2'>{row.price}</td>
              <td className='px-4 py-2'>
                <span className='flex justify-around'>
                  <BsFillTrashFill className='text-red-500 cursor-pointer' onClick={() => handleDeleteRow(idx)} />
                  <BsFillPencilFill className='text-blue-500 cursor-pointer' onClick={() => handleEditRow(idx)} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-end w-full max-w-4xl mt-4'>
        <button
          className='flex items-center px-4 py-2 bg-orange-500 rounded-lg text-white'
          onClick={() => {
            setRowToEdit(null);
            setFormState({
              name: '',
              price: 0,
            });
            setModalOpen(true);
          }}
        >
          <BsPlusLg className='mr-2' />
          Add Product
        </button>
      </div>

      {modalOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
          onClick={(e) => {
            if ((e.target as HTMLElement).className === 'modal-container') setModalOpen(false);
          }}
        >
          <div className='bg-white rounded-lg p-8 w-96'>
            <form>
              <div className='mb-4'>
                <label className='block mb-1' htmlFor='name'>Name</label>
                <input
                  name='name'
                  value={formState.name}
                  onChange={handleChange}
                  className='border rounded-md p-2 w-full'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-1' htmlFor='price'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={formState.price}
                  onChange={handleChange}
                  className='border rounded-md p-2 w-full'
                />
              </div>
              {errors && <p className='text-red-500'>{errors}</p>}
              <div className='flex justify-end'>
                <button
                  onClick={handleSubmit}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  {rowToEdit === null ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMenuPage;
