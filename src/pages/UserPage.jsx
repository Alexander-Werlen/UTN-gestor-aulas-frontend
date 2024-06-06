import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"
import NavBarUser from "../components/userComponents/NavBarUser"
import BookReserveContent from "../components/userComponents/BookReserveContent"

import styles from "../styles/userStyles/userPage.module.css"

function UserPage() {

    return (
      <div className= {styles.user_page_container}>
        <div className= {styles.nav_bar_container}>
          <NavBarUser/>
        </div>
        <div className={styles.content_container}>
        <Routes>
          <Route path="/reserve/book" element={<BookReserveContent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </div>
    )
  }
  
  export default UserPage