import React from 'react'
import { useContext, createContext, useState } from 'react'
import { AppContext } from './App.jsx'
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate();

    function guestSignIn() {
        setUsername('guest')
        navigate('/inventory');
    }

    function handleSignUp() {
        const userToAdd = { "First_Name": firstName, "Last_Name": lastName, "Password": password, "Username": username }
        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToAdd)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw new Error(error.message);
                    });
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log("User Added", data);
                alert("User Added")
            })
    }

    async function handleSubmit() {
        const userData = { "Username": username, "Password": password }
        if (!username || !password) {
            alert("Please enter username and password");
        }

        try {
            const res = await fetch(`http://localhost:8000/users/${username}/${password}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                alert("Login failed");
            }

            await res.json();
            if (res.ok) {
                setIsLoggedIn(true);
                alert("Logged in");
                navigate(`/${username}/inventory`);
            }
        } catch (err) {
            alert("Error logging in:", err);
        }
    }



    return (
        <>
            <div>
                <h1>Welcome to the Login Page!</h1>
            </div>

            <br />
            <br />

            <div>
                <h3>Sign Up:</h3>
                <input type="first_name" name="first_name" placeholder=" Enter First Name " onChange={e => setFirstName(e.target.value)}></input>
                <input type="last_name" name="last_name" placeholder=" Enter Last Name " onChange={e => setLastName(e.target.value)}></input>
                <input type="username" name="username" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)} onKeyUp={e => {
                    if (e.key === 'Enter') handleSignUp()
                }}></input> &nbsp;
                <button onClick={() => handleSignUp()}>Sign Up</button>

                <br />
                <br />

                <h3>Login:</h3>
                <input type="username" name="username" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)} onKeyUp={e => {
                    if (e.key === 'Enter') handleSubmit()
                }}></input>
                <button onClick={() => handleSubmit()}>Submit</button>

                <br />
                <br />

                <h4>Browse as Guest:</h4>
                <button onClick={() => guestSignIn()}>Click Here!</button>
            </div>
        </>
    )
}


export default LoginPage