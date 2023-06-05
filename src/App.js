import { useRef, useState } from "react";
import "./App.css"
function App() {

const inputRef = useRef(null);
const [image,setImage] = useState("");

const handleImageClick = () =>{
  inputRef.current.click();
};

const handleImageChange = (event) =>{
  const file = event.target.files[0];
  console.log(file);
 setImage(event.target.files[0]);
};

  return (

    <>
    <div className="image-upload-container ">
    <div className="box-decoration" onClick={handleImageClick}>
      <label htmlFor="image-upload-input" className="image-upload-label">
{image ? image.name: "choose an image"}
      </label>
      {image ? <img src={URL.createObjectURL(image)} alt="" className="img-display-after"/> : <img src="./page.png" alt="" className="img-display-after"/>}
      <input 
            id="image-upload-input"
      type ="file" 
      ref={inputRef} 
      onChange={handleImageChange} 
      style={{display:"none"}}/>
         <button
          className="image-upload-button"
          onClick={handleImageClick}
        >
          Upload
        </button>
      </div>
    </div>
   </>
    
    
  );
}

export default App;
