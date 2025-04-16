import React from "react"
import "./css/style.css"
import Entry from "./components/Entry"
import Button from "./components/Button"
import History from "./components/History"
import axios from "axios"

function App() {
  
  const [expense,setExpense]=React.useState("");
  const [amount,setAmount]=React.useState("");
  const backendUrl = 'https://assingmentbackend-kn8n.onrender.com';
  const [change,setChange]=React.useState(false);

  async function handleChange()
  {
    try
    { 
      const response=await axios.post(`${backendUrl}/data`,{
        expense:expense,amount:amount
      },{
        withCredentials:true
      });

      if(response.data.success)
      {
        setAmount("");
        setExpense("");   
        setChange(prev => !prev);
      }
      else
      {
        console.log("error");
      }
    }
    catch(err)
    {
      console.log(err);
    }

  }

  return (
    <>
      <div className="main-div">
       <div className="adding-expenese"> 
          <div style={{fontSize:"32px",fontWeight:"bold"}}>Expense Tracker</div>
          <div className="entry-divs">
            <Entry value={expense} setValue={setExpense} name="Expense:"  placeholder="Enter expense name" />
            <Entry value={amount}  setValue={setAmount} name="Amount:"  placeholder="Enter expense amount" />
            <div>
              <Button check={true} handleChange={handleChange} className="btn add-btn" name="Add Expense"/>
            </div>
          </div>
            
          <History change={change}/>
        

        </div> 
      </div>
    </>
  )
}

export default App
