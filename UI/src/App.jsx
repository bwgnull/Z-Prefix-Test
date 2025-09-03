import React from 'react'
import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginPage from './LoginPage.jsx'
import UserInventory from './UserInventory.jsx'
import PublicUserInventory from './PublicUserInventory.jsx'
import InventoryPage from './InventoryPage.jsx'

export const AppContext = createContext('');

function App() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userQuery, setUserQuery] = useState();

  return (
    <>
      <AppContext value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/inventory' element={<InventoryPage />} />
            <Route path='/:username/inventory' element={<UserInventory />} />
            <Route path='/inventory/:id' element={<PublicUserInventory />} />
          </Routes>
      </AppContext>
    </>
  )
}

export default App


// {/* <Route path="/inventory/:id" element={<InventoryPage />} /> */ }
