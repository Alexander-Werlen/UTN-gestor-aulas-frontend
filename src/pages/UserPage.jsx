import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"
import BookReserveContent from "../components/userComponents/BookReserveContent"

import styles from "../styles/userStyles/userPage.module.css"
import { AlertProvider } from "../hooks/userHooks/AlertContext"
import NavBar from "../components/general/NavBar"

function UserPage({sectionSelected}) {
  //hook alert

    return (
      <> 
        <NavBar className={styles.content_container} sectionSelected={sectionSelected} rol="bedel"/>
        <main className={styles.content_container}>
        <AlertProvider>
        <Routes>
          <Route path="/reserve/book" element={<BookReserveContent />} />
          <Route path="/reserve/classroom" element={<>Reservas por aula</>} />
          <Route path="/reserve/day" element={<>Reservas por dia</>} />
          <Route path="/reserve/subject" element={<>Reservas por curso</>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </AlertProvider>
        </main>
      </>
    )
  }
  
  export default UserPage