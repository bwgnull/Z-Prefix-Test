import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PublicUserInventory() {
    const { id } = useParams();
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:8000/inventory/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setItems(data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <>
            <h1>Inventory for User {id}</h1>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <p>
                            AuthorID: {item.UserId} <br />
                            Name: {item.Item_name} <br />
                            Description: {item.Description.length > 100 ? item.Description.slice(0, 100) + "..." : item.Description} <br />
                            Quantity: {item.Quantity}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PublicUserInventory