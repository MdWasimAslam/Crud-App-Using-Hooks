import React, { useState } from "react";
import "./Inventory.css";
function Inventory() {
  const [inputdata, setinputdata] = useState("");
  const [inputPrice, setinputPrice] = useState('')
  const [inputImage, setinputImage] = useState('')


  const [items, setitems] = useState([]);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (!inputdata) {
    }
    // Edit Item Value Update
    else if (inputdata && !toggleSubmit) {
      setitems(
        items.map((value) => {
          if (value.id === editItemId) {
            return { ...value, name: inputdata ,price:inputPrice,image:inputImage};
          }
          return value;
        })
      );
      settoggleSubmit(true);
      setinputdata("");
      setinputPrice("");
      setinputImage("")
      setEditItemId(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
        price:inputPrice,
        image:inputImage
      };
      setitems([...items, allInputData]);
      setinputdata("");
      setinputPrice("");
      setinputImage("")
    }
  };    

  const deleteItem = (id) => {
    const delItems = items.filter((value, index) => {
      return value.id !== id;
    });
    setitems(delItems);
  };

  const editItem = (id) => {
    const newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    settoggleSubmit(false);
    setinputdata(newEditItem.name);
    setinputPrice(newEditItem.price);
    setinputImage(newEditItem.image);
    setEditItemId(id);
  };


  const saveData=()=>{
    localStorage.setItem('data',JSON.stringify(items))
  }
  const restoreData=()=>{
   const restore=  JSON.parse(localStorage.getItem("data"));
   console.log(restore);
   restore==null?alert("NO DATA FOUND"):setitems(restore)
  }
  const removeBackup=()=>{
    localStorage.clear()
  }
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              onChange={(e) => {
                setinputdata(e.target.value);
              }}
              value={inputdata}
            />
            <input
              type="text"
              placeholder="Add Price"
              onChange={(e) => {
                setinputPrice(e.target.value);
              }}
              value={inputPrice}
            />
            <input
              type="text"
              placeholder="Add Image Link"
              onChange={(e) => {
                setinputImage(e.target.value);
              }}
              value={inputImage}
            />
            {toggleSubmit ? (
              <>
                <button onClick={addItem} className={"button"}>Add Item</button>
              </>
            ) : (
              <>
                <button onClick={addItem} className={"button button2"}>Update Item</button>
              </>
            )}
          </div>
          <div>
            <button className="button" onClick={saveData}>Save Data</button>
            <button className="button" onClick={restoreData}>Restore Data</button>
            <button className="button" onClick={removeBackup}>Remove Backup</button>
          </div>
          <div className="showItems">
            <table id="customers" style={{textAlign:"center"}}>
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th >Image</th>
                <th>Action</th>
              </tr>
              {items.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{value.name}</td>
                    <td> {value.price}</td>
                    <td><img className="productImage" src={value.image}></img></td>
                    <td>
                      <button
                      className="button button2"
                        onClick={() => {
                          editItem(value.id);
                        }}
                      >
                        Edit Item
                      </button>
                      <button
                      className="button button3"
                        onClick={() => {
                          deleteItem(value.id);
                        }}
                      >
                        Delete Item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
