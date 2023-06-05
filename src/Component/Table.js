import React, { useState } from "react";
import "./Table.css"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

export default function Table() {

  const [array, setArray] = useState([])
  const [inputdata, setInputdata] = useState({ name: "", age: "", city: "", email: "" })
  const { name, age, city, email } = inputdata;
  const [index, setIndex] = useState()
  const [bolin, setBolin] = useState(false)

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
  }

  function addinputdata() {
   
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name === "") {
      alert("Enter Name ")
    }
    else if (age === "") {
      alert("Enter age ")
    }
    else if (city === "") {
      alert("Enter city ")
    }
    else if (email === "") {
      alert("Enter email ")
    }
    else if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    else {
      setArray([...array, { name, age, city, email }])
      setInputdata({ name: "", age: "", city: "", email: "" })
    }
  }

  function deletedata(i) {
    console.log(i, "this index row want to be delete")
    const total = [...array]
    total.splice(i, 1)
    setArray(total)
  }

  function updatedata(i) {
    const { name, age, city, email } = array[i]
    setInputdata({ name, age, city, email })
    setBolin(true)
    setIndex(i)
  }

  function updateinfo() {
    const total = [...array]
    total.splice(index, 1, { name, age, city, email })
    setArray(total)
    setBolin(false)
    setInputdata({ name: "", age: "", city: "", email: "" })
  }

  return (
    <div className="a">
      <h1 id="topic">User Form</h1>

      <div className="b">
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            value={inputdata.name || ""}
            name='name'
            autoComplete='off'
            placeholder='Enter Name'
            onChange={data} />
        </div>
        <div>
          <label>Age : </label>
          <input
            type="number"
            value={inputdata.age || ""}
            name="age"
            placeholder='Enter Age'
            onChange={data} />
        </div>
        <div>
          <label>City : </label>
          <input
            type="text"
            value={inputdata.city || ""}
            name='city'
            autoComplete='off'
            placeholder='Enter City'
            onChange={data} />
        </div>
        <div>
          <label>E-mail : </label>
          <input
            type="text"
            value={inputdata.email || ""}
            name='email'
            autoComplete='off'
            placeholder='Enter E-mail'
            onChange={data} />
        </div>
        <button id="btn" onClick={!bolin ? addinputdata : updateinfo}>{!bolin ? `Submit` : `Update`}</button>
      </div>

      <br></br>
      <div className="c">
        <table border="1" width="100%">
          <tbody >
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>City</td>
              <td>E-mail</td>
            </tr>
            {
              array && array.map(
                (item, i) => {
                  return (
                    <tr id="tbody" key={i}>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.city}</td>
                      <td>{item.email}</td>

                      <td>

                        <span className="actions" >
                          <BsFillPencilFill
                            onClick={() => updatedata(i)}></BsFillPencilFill>
                          <BsFillTrashFill className="delete-btn"
                            onClick={() => deletedata(i)}></BsFillTrashFill>
                        </span>
                      </td>
                    </tr>
                  )
                }
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}