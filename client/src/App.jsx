import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter> 
   )
}

export default App