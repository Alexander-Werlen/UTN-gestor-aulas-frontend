import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminPage from "./pages/AdminPage"
import UserPage from "./pages/UserPage"
import NotFoundPage from "./pages/NotFoundPage"

import "./styles/app.css"

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
