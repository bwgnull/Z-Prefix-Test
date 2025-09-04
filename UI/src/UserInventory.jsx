import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './App'


function UserInventory() {
    const { username, isLoggedIn } = useContext(AppContext);

    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [userId, setUserId] = useState();
    const [refreshInventory, setRefreshInventory] = useState(false);
    const [del, setDel] = useState('');
    const [itemId, setItemId] = useState();
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');
    const [updatedItemId, setUpdatedItemId] = useState('');

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
                    setItemId(data[0].ItemId)
                })
                .catch(err => alert(err))
            fetch(`http://localhost:8000/users/${username}`)
                .then(res => {
                    if (!res.ok) {
                        console.log(res)
                        throw new Error('Could not find UserId');
                    } else {
                        return res.json();
                    }
                })
                .then(userid => {
                    console.log(userid.id)
                    setUserId(userid.id)
                })
                .catch(err => alert(err))
        }
        setRefreshInventory(false);
    }, [refreshInventory])


    function createItem() {
        const itemToAdd = { "UserId": userId, "Item_name": itemName, "Description": description, "Quantity": Number(quantity) }
        console.log(itemToAdd)
        fetch('http://localhost:8000/inventory', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemToAdd)
        })
            .then(async (res) => {
                if (!res.ok) {
                    return await res.json()
                        .then(error => {
                            throw new Error(error);
                        });
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log("Item Added", data);
                alert("Item Added")
                setRefreshInventory(true || false)
            })
            .catch(err => alert(err.message))
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

    function updateItem() {
        const itemToUpdate = { "id": updatedItemId, "UserId": userId, "Item_name": updatedItemName, "Description": updatedDescription, "Quantity": Number(updatedQuantity) }
        fetch(`http://localhost:8000/inventory/${updatedItemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemToUpdate)
        })
            .then(async (res) => {
                if (!res.ok) {
                    return await res.json()
                        .then(error => {
                            throw new Error(error);
                        });
                } else {
                    return res.json();
                }
            })
            .then(data => {
                alert("Item Updated")
                setRefreshInventory(true || false)
            })
            .catch(err => alert(err.message))
    }

    return (
        <>
            <div>
                <h1>{username}'s Inventory</h1>
                <button onClick={() => navigate('/inventory')}>See Everyones Items</button>
                <br />
                <br />
                {items.length == 0 ? (
                    <h3>There are currently no items in your inventory.</h3>
                ) : (
                    items.map((item) => (
                        <div key={item.UserId}>
                            <div onClick={() => navigate(`/inventory/${item.ItemId}`)}>
                                <p>
                                    Id: {item.ItemId} <br />
                                    AuthorID: {userId} <br />
                                    Name: {item.Item_name} <br />
                                    Description: {item.Description.length > 100 ? item.Description.slice(0, 100) + "..." : item.Description} <br />
                                    Quantity: {item.Quantity}
                                </p>
                            </div>
                        </div>
                    )))}
            </div>

            <br />
            <br />

            <div>
                <h2>Create Items</h2>
                <input type="text" name="Item_name" placeholder="Enter Item Name" value={itemName} onChange={e => setItemName(e.target.value)} />
                <input type='text' name="Description" placeholder=" Enter Description Here " value={description} onChange={e => setDescription(e.target.value)} />
                <input type='number' name="Quantity" placeholder=" Enter Quantity " value={quantity} onChange={e => setQuantity(e.target.value)} /> &nbsp;
                <button onClick={() => createItem()}>Create Item</button>
            </div>

            <br />
            <br />

            <div>
                <h2>Update Items</h2>
                <input type='number' name="Item_id" placeholder="Item ID of changed Item" value={updatedItemId} onChange={e => setUpdatedItemId(e.target.value)} />
                <input type="text" name="Item_name" placeholder="Enter Updated Item Name" value={updatedItemName} onChange={e => setUpdatedItemName(e.target.value)} />
                <input type='text' name="Description" placeholder=" Enter Updated Description Here " value={updatedDescription} onChange={e => setUpdatedDescription(e.target.value)} />
                <input type='number' name="Quantity" placeholder=" Enter Updated Quantity " value={updatedQuantity} onChange={e => setUpdatedQuantity(e.target.value)} /> &nbsp;
                <button onClick={() => updateItem()}>Update Item</button>
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