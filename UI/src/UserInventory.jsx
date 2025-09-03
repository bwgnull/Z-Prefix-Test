import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './App'


function UserInventory() {
    const { username, isLoggedIn } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [userId, setUserId] = useState();
    const [refreshInventory, setRefreshInventory] = useState(false);
    const [del, setDel] = useState('');
    const [itemId, setItemId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            alert('Please log in');
            navigate('/');
        } else {
            fetch(`http://localhost:8000/users/${username}/inventory`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed To Fetch');
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    setItems(data)
                    console.log(data)
                    setUserId(data[0].UserId)
                    setItemId(data[0].ItemId)
                })
                .catch(err => alert(err))
        }
    }, [refreshInventory])


    function createItem() {
        const itemToAdd = { "UserId": userId, "Item_name": itemName, "Description": description, "Quantity": quantity }
        fetch('http://localhost:8000/inventory', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemToAdd)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw new Error(error);
                    });
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log("Item Added", data);
                alert("Item Added")
                setRefreshInventory(true)
            })
            .catch(err => alert(err))
    }

    async function deleteItem() {
        try {
            const res = await fetch(`http://localhost:8000/inventory/${del}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                const error = await res.json()
                    alert(error)
            } else {
                const data = await res.json();
                alert('item deleted', data)
            }
        } 
        catch (err) {
            alert(err)
        }
        setRefreshInventory(true)
}

    return (
        <>
            <div>
                <h1>{username}'s Inventory</h1> 
                <button onClick={() => navigate('/inventory')}>See Everyones Items</button>
                <br />
                <br />
                {items.map((item) => (
                    <div key={item.UserId}>
                        <p>
                            Id: {itemId} <br />
                            Name: {item.Item_name} <br />
                            Description: {item.Description.length > 100 ? item.Description.slice(0, 100) + "..." : item.Description} <br />
                            Quantity: {item.Quantity}
                        </p>
                    </div>
                ))}
            </div>

            <br />
            <br />

            <div>
                <h2>Create Items</h2>
                <input type='text' name="Item_name" placeholder=" Enter Item Name " onChange={e => setItemName(e.target.value)} />
                <input type='text' name="Description" placeholder=" Enter Description Here " onChange={e => setDescription(e.target.value)} />
                <input type='number' name="Quantity" placeholder=" Enter Quantity " onChange={e => setQuantity(e.target.value)} /> &nbsp;
                <button onClick={() => createItem()}>Create Item</button>
            </div>

            <br />
            <br />

            <div>
                <h2>Delete Items</h2>
                <input type='number' name="Item_id" placeholder="Item ID Here" onChange={e => setDel(e.target.value)} /> &nbsp;
                <button onClick={() => deleteItem()}>Delete Item</button>
            </div>
        </>
    )
}

export default UserInventory