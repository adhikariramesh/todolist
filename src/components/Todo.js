import React, { useEffect, useState } from 'react';
import "./style.css";
import image from "./image/todo.svg"

const getItemsList = () => {
    const list = localStorage.getItem("mylist");
    if (list) {
        return JSON.parse(list);
    }
    return [];
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [item, setItems] = useState(getItemsList());
    const [editItem, setEditItem] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false);

    // add items
    const addItem = () => {
        // console.log("funciton runing")
        if (!inputData) {
            alert("plese fill data");
        }
        else if (inputData && toggleBtn) {
            
            setItems(
                item.map((cr) => {
                    if (cr.id === editItem) {
                        return { ...cr, name:inputData }
                    }
                    return cr;
                })
            )
            setInputData("");
            setToggleBtn(false);
            setEditItem(null);
        }
        else {
            let newItemList = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...item, newItemList]);
            setInputData("");

        }
    }
    // edit items 
    const updateItem = (index) => {
        // console.log(index)
        const newItem = item.find((curElmnts) => {
            return curElmnts.id === index;
        })
        setInputData(newItem.name);
        setEditItem(index);
        setToggleBtn(true);

    }

    // data store in local storages
    useEffect(() => {
        localStorage.setItem("mylist", JSON.stringify(item));
    }, [item]);


    // delete Items
    const deletItem = (index) => {
        const newList = item.filter((curElmnts) => {
            return curElmnts.id !== index;
        })
        setItems(newList);
    }
    return (
        <>
            <div className="main-container flex aline-center">
                <div className="container flex aline-center">
                    <div className="img-body">
                        <img src={image} alt="Todo List" />
                    </div>
                    <div className="inputArea subtle flex aline-center">
                        <input type="text" className='inputbox' placeholder='✍ Add Item' value={inputData}
                            onChange={(e) => setInputData(e.target.value)} />
                        {(!toggleBtn ? <i className="fa-solid fa-plus icons"
                            onClick={addItem}></i> : <i className="fa-solid fa-pen-to-square  icons edit"
                                onClick={addItem}></i>)}

                    </div>

                    <div className="show-item flex aline-center">
                        {
                            item.map((curElmnt) => {
                                return (
                                    <>
                                        <div className="items subtle flex aline-center" key={curElmnt.id}>
                                            <div className="item-data">
                                                <h2>{curElmnt.name}</h2>
                                            </div>
                                            <div className="btn-icon flex aline-center">
                                                <i className="fa-solid fa-pen-to-square icons edit"
                                                    onClick={() => updateItem(curElmnt.id)}></i>
                                                <i className="fa-solid fa-trash icons delet"
                                                    onClick={() => deletItem(curElmnt.id)}></i>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>

                    <div className="clear-btn">
                        <button className='btn' onClick={() => setItems([])}>clear all</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
