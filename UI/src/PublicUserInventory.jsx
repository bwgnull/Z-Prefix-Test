import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PublicUserInventory() {
    const { id } = useParams();
    const [items, setItems] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/inventory/users/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something Went Wrong")
                } else {
                    return res.json();
                }
            })
            .then((data => {
                setItems(data)
                console.log(data)
            }))
            .catch(err => alert(err.message))
    }, [])

    return (
        <>
            <h1>All Items published by User {id}</h1>
            <div>
                {items.map((item) => (
                    <div key={item.UserId} style={{ border: "2px solid black", paddingBottom: "0.2em", marginBottom: "0.2em", backgroundColor: "rgba(180, 235, 234, .91)" }}>
                        <div onClick={() => navigate(`/inventory/${item.id}`)}>
                            <p>
                                AuthorID: {item.UserId} <br />
                                ItemId: {item.id} <br />
                                Name: {item.Item_name} <br />
                                Description: {item.Description.length > 100 ? item.Description.slice(0, 100) + "..." : item.Description} <br />
                                Quantity: {item.Quantity}
                            </p>
                        </div>
                        <br />
                    </div>
                ))}
            </div>
        </>
    )
}

export default PublicUserInventory