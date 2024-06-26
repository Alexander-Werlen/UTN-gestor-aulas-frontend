import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"
import NavBarUser from "../components/userComponents/NavBarUser"
import BookReserveContent from "../components/userComponents/BookReserveContent"

import styles from "../styles/userStyles/userPage.module.css"

function UserPage({sectionSelected}) {

    return (
      <div className= {styles.user_page_container}>
        <div className= {styles.nav_bar_container}>
          <NavBarUser sectionSelected={sectionSelected}/>
        </div>
        <div className={styles.content_container}>
        <Routes>
          <Route path="/reserve/book" element={<BookReserveContent />} />
          <Route path="/reserve/classroom" element={<>Reservas por aula</>} />
          <Route path="/reserve/day" element={<>Reservas por dia</>} />
          <Route path="/reserve/subject" element={<>Reservas por curso</>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </div>
    )
  }
  
  export default UserPage