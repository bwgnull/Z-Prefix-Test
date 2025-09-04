import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function InventoryPage() {
    const [items, setItems] = useState([]);
    const [userQuery, setUserQuery] = useState();
    const navigate = useNavigate();

    function queryUser() {
        navigate(`/inventory/users/${userQuery}`)
    }

    useEffect(() => {
        fetch("http://localhost:8000/inventory")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setItems(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <input type='number' name="searchUser" placeholder=" Enter UserID " onChange={e => setUserQuery(e.target.value)} /> &nbsp;
            <button onClick={() => queryUser()}>Search User</button>
            <h1>Inventory from all inventory managers</h1>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <div onClick={() => navigate(`/inventory/${item.id}`)}>
                            <p>
                                AuthorID: {item.UserId} <br />
                                Name: {item.Item_name} <br />
                                Description: {item.Description.length > 100 ? item.Description.slice(0, 100) + "..." : item.Description} <br />
                                Quantity: {item.Quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default InventoryPage
