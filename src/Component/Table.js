import React, {useRef, useState } from "react";
import "./Table.css"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";


export default function Table() {

  const [array, setArray] = useState([])
  const [inputdata, setInputdata] = useState({ name: "", age: "", city: "", email: "" ,image:""})
  const { name, age, city, email ,image} = inputdata;
  const [index, setIndex] = useState()
  const [bolin, setBolin] = useState(false)
  const [errors, setError] = useState({})
  const inputRef = useRef(null);
  
  const handleChange = (e) => {
   // let file = [0];
    const file = e.target.files;
    console.log(file);
    setInputdata(e.target.files);
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(validation(inputdata))
  }

  function validation(inputdata) {

 let error ={}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (inputdata.name === "") {
      error.name = "name is required!";
    }
    else if (inputdata.age === "") {
      error.age = "Email is required!";
    }
   else if (inputdata.city === "") {
      error.city = "Email is required!";
    }
 else if (inputdata.email === "") {
      error.email = "Email is required!";

    } else if (!regex.test(inputdata.email)) {
      error.email = "This is not a valid email format!";
    
    // }  else if (inputdata.image === "") {
    //   error.image = "Image is required!";
    // }
    }else {
      setArray([...array, { name, age, city, email ,image}])
      setInputdata({ name: "", age: "", city: "", email: "",image:"" })
    }
    return error ;
  };

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
            onChange={handleChange} />
        </div>

        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        <div>
          <label>Age : </label>
          <input
            type="number"
            value={inputdata.age || ""}
            name="age"
            placeholder='Enter Age'
            onChange={handleChange} />
        </div>
        {errors.age && <p style={{color:"red"}}>{errors.age}</p>}
        <div>
          <label>City : </label>
          <input
            type="text"
            value={inputdata.city || ""}
            name='city'
            autoComplete='off'
            placeholder='Enter City'
            onChange={handleChange} />
        </div>
        {errors.city && <p style={{color:"red"}}>{errors.city}</p>}
        <div>
          <label>E-mail : </label>
          <input
            type="text"
            value={inputdata.email || ""}
            name='email'
            autoComplete='off'
            placeholder='Enter E-mail'
            onChange={handleChange} />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
        </div>
        <label>Image : </label>
        <>
    <div className="image-upload-container ">
    <div className="box-decoration" >
{/*       
      {image ? <img src={URL.createObjectURL(image)} alt="" className="img-display-after"/> : <img src="./page.png" alt="" className="img-display-after"/>}
      */}
      <input  
       //value={inputdata.image || ""}
      className="image-upload-button"
      id="image-upload-input"
      type ="file" 
      ref={inputRef} 
      onChange={handleChange} 
     />
         {errors.image && <p style={{color:"red"}}>{errors.image}</p>} 
      </div>
    </div>
   </>

        <button id="btn" onClick={!bolin ? handleSubmit : updateinfo}>{!bolin ? `Submit` : `Update`}</button>
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
              <td>Image</td>

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
                      <td>{item.image}</td>

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