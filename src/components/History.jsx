import React from "react";
import Trans from "./Trans";
import Heading from "./Heading";
import Button from "./Button";
import axios from "axios";

function History(props) {
  const backendUrl = 'https://assingmentbackend-kn8n.onrender.com';
  const [data, setData] = React.useState([]);
  const [editingId, setEditingId] = React.useState(null);
  const [editForm, setEditForm] = React.useState({
    expense: '',
    amount: ''
  });
  const [total,setTotal]=React.useState(0);

  React.useEffect(() => {
    loadData();
  }, [props.change]);

  React.useEffect(() => {
    let final = 0;
    for (let i = 0; i < data.length; i++) {
      final += parseFloat(data[i].amount);
    }
    setTotal(final);
  }, [data]);
  
  async function loadData() {
    try {
      const response = await axios.get(`${backendUrl}/getData`, {
        withCredentials: true
      });

      if (response.data.success === true) {
        setData(response.data.data);

      }
    
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem(id) {
    console.log(id);

    try {
      const response = await axios.post(`${backendUrl}/deleteItem/${id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setData(prevData => prevData.filter(item => item.id !== id));
       
      }
    } catch (err) {
      console.log(err);
    }
  }

  function startEditing(item) {
    setEditingId(item.id);
    setEditForm({
      expense: item.expense,
      amount: item.amount
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({
      expense: '',
      amount: ''
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function saveEdit(id) {
    try {
      const response = await axios.post(`${backendUrl}/updateItem/${id}`, {
        expense: editForm.expense,
        amount: editForm.amount
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        // Update the local state with the edited data
        setData(prevData => prevData.map(item => 
          item.id === id ? { ...item, expense: editForm.expense, amount: editForm.amount } : item
        ));
        setEditingId(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="transactions-div">
      <Heading item={total} />
      <div className="trans-div">
        {data.map((item) => (
          <div key={item.id} className="trans-item">
            {editingId === item.id ? (
              // Edit mode
              <>
                <div className="detail">
                  <div>Expense : </div>
                  <input
                    name="expense"
                    value={editForm.expense}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                </div>
                <div className="detail">
                  <div>Amount : </div>
                  <input
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="edit-input"
                    type="number"
                  />
                </div>
                <div>
                  <button className="btn edit" onClick={() => saveEdit(item.id)}>Save</button>
                  <button className="btn delete" onClick={cancelEditing}>Cancel</button>
                </div>
              </>
            ) : (
              // Display mode
              <>
                <Trans name="Expense" item={item.expense} />
                <Trans name="Amount" item={`${item.amount} rupee`} />
                <div>
                  <Button 
                    className="btn edit" 
                    name="Edit" 
                    onClick={() => startEditing(item)} 
                  />
                  <Button 
                    delete={true} 
                    index={item.id} 
                    deleteItem={deleteItem} 
                    className="btn delete" 
                    name="Delete" 
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;