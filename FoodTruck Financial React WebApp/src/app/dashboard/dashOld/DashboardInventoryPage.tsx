import React, { useState } from "react";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFilterCircle,
  BsSearch,
  BsPlusLg,
} from "react-icons/bs";
import "../../../styles/DashInventory.css";
interface RowData {
  name: string;
  weight: string;
  quantity: number;
  category: string;
  status: string;
}

const DashboardInventoryPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<RowData[]>([
    {
      name: "Steak",
      weight: "10",
      quantity: 1,
      category: "meat",
      status: "stocked",
    },
    {
      name: "Chicken",
      weight: "10",
      quantity: 1,
      category: "meat",
      status: "limited",
    },
    {
      name: "Pork",
      weight: "10",
      quantity: 1,
      category: "meat",
      status: "depleted",
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [formState, setFormState] = useState<RowData>({
    name: "",
    weight: "",
    quantity: 0,
    category: "misc",
    status: "stocked",
  });
  const [errors, setErrors] = useState<string>("");

  const handleDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (formState.name && formState.weight && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
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
      name: "",
      weight: "",
      quantity: 0,
      category: "misc",
      status: "stocked",
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
    <div className="table-container">
      <div className="cards-container">
        <div className="card">
          <div className="card-content">
            <p>Summary</p>
            <h2>Food</h2>
            <p>Sample</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <p>Status</p>
            <h2>Good</h2>
            <p></p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <p>Empty Products</p>
            <h2>None</h2>
            <p>Chicken low</p>
          </div>
        </div>
      </div>

      <div className="products-header">
        <p>Product list</p>
        <div className="search-filter">
          <div className="search-container">
            <div className="search-icon" />
            <BsSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>
          <button className="filter-icon-btn">
            <BsFilterCircle className="filter-icon" />
            Filter
          </button>
        </div>
      </div>

      <table className="table">
        <colgroup>
          <col className="name-col" />
          <col className="weight-col" />
          <col className="quantity-col" />
          <col className="category-col" />
          <col className="status-col" />
          <col className="actions-col" />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Qty</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
            const categoryText =
              row.category.charAt(0).toUpperCase() + row.category.slice(1);

            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.weight}</td>
                <td>{row.quantity}</td>
                <td>{categoryText}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDeleteRow(idx)}
                    />
                    <BsFillPencilFill onClick={() => handleEditRow(idx)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="add-btn-container">
        <button
          className="btn add-btn"
          onClick={() => {
            setRowToEdit(null);
            setFormState({
              name: "",
              weight: "",
              quantity: 0,
              category: "misc",
              status: "stocked",
            });
            setModalOpen(true);
          }}
        >
          <BsPlusLg className="add-icon" />
          Add Product
        </button>
      </div>

      {modalOpen && (
        <div
          className="modal-container"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "modal-container")
              setModalOpen(false);
          }}
        >
          <div className="modal">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formState.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formState.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                >
                  <option value="meat">Meat</option>
                  <option value="fruit">Fruit</option>
                  <option value="dairy">Dairy</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="misc">Misc</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formState.status}
                  onChange={handleChange}
                >
                  <option value="stocked">Stocked</option>
                  <option value="limited">Limited</option>
                  <option value="depleted">Depleted</option>
                </select>
              </div>
              {errors && (
                <div className="error">{`Please include: ${errors}`}</div>
              )}
              <button type="submit" className="btn" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInventoryPage;
