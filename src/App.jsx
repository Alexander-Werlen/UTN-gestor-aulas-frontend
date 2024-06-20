import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import UserPage from "./pages/UserPage"
import NotFoundPage from "./pages/NotFoundPage"

import "./styles/app.css"

function App() {

  const location = useLocation()
  const slitPath = location.pathname.split('/')
  const sectionSelected = slitPath[slitPath.length-1]

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminPage sectionSelected={sectionSelected} />} />
      <Route path="/user/*" element={<UserPage sectionSelected={sectionSelected} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
