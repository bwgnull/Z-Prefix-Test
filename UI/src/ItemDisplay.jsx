import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ItemDisplay() {
    const [itemName, setItemName] = useState();
    const [items, setItems] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8000/inventory/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed To Fetch');
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setItems(data)
                console.log(data[0].Item_name)
                setItemName(data[0].Item_name)
            })
            .catch(err => {
                alert(err)
            })
    }, [])

    return (
        <>
            <h1>Details for {itemName}</h1>
            <div>
                {items.map((item) => (
                    <div key={item.UserId} style={{ border: "2px solid black", paddingBottom: "0.2em", marginBottom: "0.2em", backgroundColor: "rgba(180, 235, 234, .91)" }}>
                        <p>
                            Id: {item.id} <br />
                            AuthorID: {item.UserId} <br />
                            Name: {item.Item_name} <br />
                            Description: {item.Description} <br />
                            Quantity: {item.Quantity}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ItemDisplay