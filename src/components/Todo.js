import React, { useState, useEffect } from "react";

//get data from localStorage

const getLocalStorageData = () => {
  console.log("get local storage data")
  let list = localStorage.getItem("data");
  console.log("list ka data",list)
  if (list) {
    // console.log(JSON.parse(list))
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [toggleEdit, setToggleEdit] = useState(true);
  const [editItemId,setEditItemId] = useState(null)

  /*Handling input data */
  const handleChange = (ev) => {
    setInputData(ev.target.value);
  };

  /*Handling Button to show data */

  const addItem = () => {
    if (inputData != "") {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([allInputData, ...items]);
      setInputData("");
      // toggleEdit ? setToggleEdit(true) :setToggleEdit(true)
    }
    if(inputData != "" && toggleEdit === false){
      setItems(
        items.map((item)=>{
          if(item.id === editItemId){
            return {...item ,name:inputData}
          }
          return item
        })
      )
      setToggleEdit(true)
    }
  };
  console.log(items);

  /*Handling Button to delete data */
  const deleteItem = (id) => {
    const updatedData = items.filter((item) => {
      return item.id !== id;
    });
    // console.log(updatedData)
    setItems(updatedData);
  };

  // local storage -setting the data

  useEffect(() => {
    console.log("Use effect coming into the picture")
    localStorage.setItem("data", JSON.stringify(items));
  }, [items]);

  //edit item steps

  const editItem = (id) => {
    let newEditItem = items.find((item) => item.id === id);
    setInputData(newEditItem.name);
    setToggleEdit(!toggleEdit)
    setEditItemId(id)
  };

  return (
    <>
      <div className="main-div">
        <div className="text">TODO APP</div>
        <div className="addItems">
          <input
            type="text"
            placeholder="Enter Your Text..."
            value={inputData}
            onChange={handleChange}
          />
          {toggleEdit ? (
            <button className="add-btn" onClick={addItem}>
              +
            </button>
          ) : (
            <button className="edit-btn" onClick={addItem}>
              Edit
            </button>
          )}
        </div>
        <div className="show-item">
          {items.map((item) => {
            return (
              <div className="each-item" key={item.id}>
                <h3>{item.name}</h3>

                <button
                  className="edit-btn"
                  onClick={() => {
                    editItem(item.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="minus-btn"
                  onClick={() => deleteItem(item.id)}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
