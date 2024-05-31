import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"
import NavBarAdmin from "../components/adminComponents/NavBarAdmin"
import BuscarBedelContent from "../components/adminComponents/BuscarBedelContent"
import RegistrarBedelContent from "../components/adminComponents/RegistrarBedelContent"

import styles from "../styles/adminStyles/adminPage.module.css"

function AdminPage() {

    return (
      <div className= {styles.admin_page_container}>
        <div className= {styles.nav_bar_container}>
          <NavBarAdmin />
        </div>
        <div className={styles.bedel_content_container}>
        <Routes>
          <Route path="/bedel/register" element={<RegistrarBedelContent/>} />
          <Route path="/bedel/search" element={<BuscarBedelContent/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </div>
    )
  }
  
  export default AdminPage