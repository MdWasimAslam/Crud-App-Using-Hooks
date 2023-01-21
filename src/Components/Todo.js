import React, { useState } from "react";

function Todo() {
  const [inputdata, setinputdata] = useState("");
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
            return { ...value, name: inputdata };
          }
          return value;
        })
      );
      settoggleSubmit(true);
      setinputdata("");
      setEditItemId(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setitems([...items, allInputData]);
      setinputdata("");
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
    setEditItemId(id);
  };

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
            {toggleSubmit ? (
              <>
                <button onClick={addItem}>Add Item</button>
              </>
            ) : (
              <>
                <button onClick={addItem}>Update Item</button>
              </>
            )}
          </div>
          <div className="showItems">
            <div className="eachItem">
              {items.map((value, index) => {
                return (
                  <div key={value.id}>
                    <h3>{value.name}</h3>
                    <button
                      onClick={() => {
                        editItem(value.id);
                      }}
                    >
                      Edit Item
                    </button>
                    <button
                      onClick={() => {
                        deleteItem(value.id);
                      }}
                    >
                      Delete Item
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
