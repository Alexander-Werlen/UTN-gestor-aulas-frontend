import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"
import BuscarBedelContent from "../components/adminComponents/BuscarBedelContent"
import RegistrarBedelContent from "../components/adminComponents/RegistrarBedelContent"

import styles from "../styles/adminStyles/adminPage.module.css"

import NavBar from "../components/general/NavBar"

function AdminPage({sectionSelected}) {

    return (
      <>
          <NavBar  className={styles.content_container} sectionSelected={sectionSelected} rol="admin"/>
          <main className={styles.content_container}>
        <Routes>
          <Route path="/bedel/register" element={<RegistrarBedelContent/>} />
          <Route path="/bedel/search" element={<BuscarBedelContent/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </main>
        </>
    )
  }
  
  export default AdminPage